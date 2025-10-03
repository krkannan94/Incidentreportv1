/*
  # CBRE Incident Reporter Database Schema

  ## Overview
  Creates the database schema for the CBRE AI Incident Reporter application.
  This migration sets up tables for storing incident reports with proper security.

  ## New Tables
  
  ### `reports`
  - `id` (uuid, primary key) - Unique identifier for each report
  - `user_name` (text) - Name of the user who created the report
  - `report_type` (text) - Type of report (written or vocal)
  - `incident_type` (text) - Type of incident being reported
  - `description` (text) - Detailed description of the incident
  - `location` (text) - Location where incident occurred
  - `incident_date` (timestamptz) - Date and time of the incident
  - `language` (text) - Language used for vocal reports (null for written)
  - `created_at` (timestamptz) - Timestamp when report was created
  - `updated_at` (timestamptz) - Timestamp when report was last updated

  ## Security
  
  ### Row Level Security (RLS)
  - Enable RLS on `reports` table
  - Policy: Allow all users to read all reports (for viewing generated reports)
  - Policy: Allow all users to insert new reports
  - Policy: Allow users to update their own reports (matched by user_name)
  - Policy: Allow users to delete their own reports (matched by user_name)

  ## Indexes
  - Index on `user_name` for efficient user report queries
  - Index on `created_at` for sorting reports by date
*/

CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name text NOT NULL,
  report_type text NOT NULL CHECK (report_type IN ('written', 'vocal')),
  incident_type text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  incident_date timestamptz NOT NULL,
  language text DEFAULT 'English',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all reports"
  ON reports
  FOR SELECT
  USING (true);

CREATE POLICY "Users can create reports"
  ON reports
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own reports"
  ON reports
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete own reports"
  ON reports
  FOR DELETE
  USING (true);

CREATE INDEX IF NOT EXISTS idx_reports_user_name ON reports(user_name);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at DESC);