-- Seed data for NexusHub
-- Seed users with known demo credentials for local development.
-- Passwords: admin / 1111, manager / 1111, user / 1111
INSERT INTO users (username, email, password_hash, name, role, status)
SELECT 'admin', 'admin@nexushub.com', '$2b$10$AWPrrjxRsZ0R28wFtgasuen8/YNY/vjKMqaSCDP8xwupM6lchG/ha', 'Admin User', 'admin', 'active'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin');

INSERT INTO users (username, email, password_hash, name, role, status)
SELECT 'manager', 'manager@nexushub.com', '$2b$10$AWPrrjxRsZ0R28wFtgasuen8/YNY/vjKMqaSCDP8xwupM6lchG/ha', 'Manager User', 'manager', 'active'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'manager');

INSERT INTO users (username, email, password_hash, name, role, status)
SELECT 'user', 'user@nexushub.com', '$2b$10$AWPrrjxRsZ0R28wFtgasuen8/YNY/vjKMqaSCDP8xwupM6lchG/ha', 'Regular User', 'user', 'active'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'user');

-- Members
INSERT INTO members (member_id, name, email, phone, department, position, status, hire_date)
SELECT 'MEM001', 'Alice Johnson', 'alice@company.com', '555-0101', 'Engineering', 'Software Engineer', 'active', '2023-01-15'
WHERE NOT EXISTS (SELECT 1 FROM members WHERE member_id = 'MEM001');

INSERT INTO members (member_id, name, email, phone, department, position, status, hire_date)
SELECT 'MEM002', 'Brian Lee', 'brian@company.com', '555-0102', 'Sales', 'Sales Manager', 'active', '2023-02-20'
WHERE NOT EXISTS (SELECT 1 FROM members WHERE member_id = 'MEM002');

INSERT INTO members (member_id, name, email, phone, department, position, status, hire_date)
SELECT 'MEM003', 'Carmen Smith', 'carmen@company.com', '555-0103', 'HR', 'HR Specialist', 'active', '2023-03-10'
WHERE NOT EXISTS (SELECT 1 FROM members WHERE member_id = 'MEM003');

INSERT INTO members (member_id, name, email, phone, department, position, status, hire_date)
SELECT 'MEM004', 'David Wilson', 'david@company.com', '555-0104', 'Engineering', 'Junior Developer', 'active', '2023-04-05'
WHERE NOT EXISTS (SELECT 1 FROM members WHERE member_id = 'MEM004');

INSERT INTO members (member_id, name, email, phone, department, position, status, hire_date)
SELECT 'MEM005', 'Emma Davis', 'emma@company.com', '555-0105', 'Marketing', 'Marketing Manager', 'active', '2023-05-12'
WHERE NOT EXISTS (SELECT 1 FROM members WHERE member_id = 'MEM005');

-- Work Requests
INSERT INTO requests (request_number, title, description, priority, status, assigned_to, created_by, due_date)
SELECT 'REQ001', 'Update User Dashboard', 'Redesign the main dashboard with new metrics', 'high', 'pending', 1, 1, '2026-08-10'
WHERE NOT EXISTS (SELECT 1 FROM requests WHERE request_number = 'REQ001');

INSERT INTO requests (request_number, title, description, priority, status, assigned_to, created_by, due_date)
SELECT 'REQ002', 'API Documentation', 'Create comprehensive API documentation', 'medium', 'in_progress', 2, 1, '2026-08-15'
WHERE NOT EXISTS (SELECT 1 FROM requests WHERE request_number = 'REQ002');

INSERT INTO requests (request_number, title, description, priority, status, assigned_to, created_by, due_date)
SELECT 'REQ003', 'Database Migration', 'Migrate from MySQL to PostgreSQL', 'urgent', 'pending', 3, 1, '2026-07-25'
WHERE NOT EXISTS (SELECT 1 FROM requests WHERE request_number = 'REQ003');

INSERT INTO requests (request_number, title, description, priority, status, assigned_to, created_by, due_date)
SELECT 'REQ004', 'Email Notifications', 'Implement email notification system', 'medium', 'completed', 4, 1, '2026-07-05'
WHERE NOT EXISTS (SELECT 1 FROM requests WHERE request_number = 'REQ004');

INSERT INTO requests (request_number, title, description, priority, status, assigned_to, created_by, due_date)
SELECT 'REQ005', 'Mobile App Testing', 'Test mobile app on multiple devices', 'high', 'in_progress', 5, 1, '2026-08-20'
WHERE NOT EXISTS (SELECT 1 FROM requests WHERE request_number = 'REQ005');

-- Resources
INSERT INTO resources (resource_code, name, category, description, status, quantity, location)
SELECT 'RES001', 'Development Server', 'Infrastructure', 'Main development server for testing', 'in_use', 1, 'Data Center A'
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE resource_code = 'RES001');

INSERT INTO resources (resource_code, name, category, description, status, quantity, location)
SELECT 'RES002', 'Database Server', 'Infrastructure', 'PostgreSQL database server', 'available', 1, 'Data Center A'
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE resource_code = 'RES002');

INSERT INTO resources (resource_code, name, category, description, status, quantity, location)
SELECT 'RES003', 'Project Management Tool', 'Software', 'Jira for project tracking', 'in_use', 5, 'Cloud'
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE resource_code = 'RES003');

INSERT INTO resources (resource_code, name, category, description, status, quantity, location)
SELECT 'RES004', 'Slack Workspace', 'Software', 'Team communication platform', 'in_use', 50, 'Cloud'
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE resource_code = 'RES004');

INSERT INTO resources (resource_code, name, category, description, status, quantity, location)
SELECT 'RES005', 'Developer Licenses', 'Software', 'Visual Studio Professional licenses', 'available', 10, 'Office'
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE resource_code = 'RES005');

INSERT INTO resources (resource_code, name, category, description, status, quantity, location)
SELECT 'RES006', 'Conference Room', 'Facility', 'Meeting space for team gatherings', 'available', 1, 'Building B'
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE resource_code = 'RES006');

-- Activities
INSERT INTO activities (user_id, action, description, entity_type, entity_id)
SELECT 1, 'LOGIN', 'Admin logged in', 'user', 1
WHERE NOT EXISTS (
  SELECT 1 FROM activities
  WHERE action = 'LOGIN' AND description = 'Admin logged in' AND entity_type = 'user' AND entity_id = 1
);

INSERT INTO activities (user_id, action, description, entity_type, entity_id)
SELECT 1, 'CREATE', 'Created new request REQ001', 'request', 1
WHERE NOT EXISTS (
  SELECT 1 FROM activities
  WHERE action = 'CREATE' AND description = 'Created new request REQ001' AND entity_type = 'request' AND entity_id = 1
);

INSERT INTO activities (user_id, action, description, entity_type, entity_id)
SELECT 1, 'CREATE', 'Created new member MEM001', 'member', 1
WHERE NOT EXISTS (
  SELECT 1 FROM activities
  WHERE action = 'CREATE' AND description = 'Created new member MEM001' AND entity_type = 'member' AND entity_id = 1
);

INSERT INTO activities (user_id, action, description, entity_type, entity_id)
SELECT 1, 'UPDATE', 'Updated request status', 'request', 4
WHERE NOT EXISTS (
  SELECT 1 FROM activities
  WHERE action = 'UPDATE' AND description = 'Updated request status' AND entity_type = 'request' AND entity_id = 4
);

INSERT INTO activities (user_id, action, description, entity_type, entity_id)
SELECT 2, 'LOGIN', 'Manager logged in', 'user', 2
WHERE NOT EXISTS (
  SELECT 1 FROM activities
  WHERE action = 'LOGIN' AND description = 'Manager logged in' AND entity_type = 'user' AND entity_id = 2
);
