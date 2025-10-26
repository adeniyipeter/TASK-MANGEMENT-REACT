/*
  # Create Tickets Management System

  1. New Tables
    - `tickets`
      - `id` (uuid, primary key) - Unique identifier for each ticket
      - `user_id` (uuid, foreign key) - References auth.users, owner of the ticket
      - `title` (text, required) - Ticket title
      - `description` (text, optional) - Detailed description of the ticket
      - `status` (text, required) - Must be 'open', 'in_progress', or 'closed'
      - `priority` (text, optional) - Priority level (low, medium, high)
      - `created_at` (timestamptz) - Timestamp when ticket was created
      - `updated_at` (timestamptz) - Timestamp when ticket was last updated

  2. Security
    - Enable RLS on `tickets` table
    - Add policy for authenticated users to view their own tickets
    - Add policy for authenticated users to create tickets
    - Add policy for authenticated users to update their own tickets
    - Add policy for authenticated users to delete their own tickets

  3. Important Notes
    - Status field is constrained to only accept: 'open', 'in_progress', 'closed'
    - Timestamps are automatically managed with triggers
    - All users can only access their own tickets (enforced via RLS)
*/

-- Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text DEFAULT '',
  status text NOT NULL CHECK (status IN ('open', 'in_progress', 'closed')),
  priority text CHECK (priority IN ('low', 'medium', 'high')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS tickets_user_id_idx ON tickets(user_id);
CREATE INDEX IF NOT EXISTS tickets_status_idx ON tickets(status);

-- Create trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists, then create it
DROP TRIGGER IF EXISTS update_tickets_updated_at ON tickets;
CREATE TRIGGER update_tickets_updated_at
  BEFORE UPDATE ON tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own tickets"
  ON tickets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create tickets"
  ON tickets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tickets"
  ON tickets FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own tickets"
  ON tickets FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);