-- Baseline schema for IcareForYou

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Roles (simple RBAC)
CREATE TABLE IF NOT EXISTS role (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name            varchar(50) NOT NULL UNIQUE
);

-- Users used for authentication
CREATE TABLE IF NOT EXISTS app_user (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email                 varchar(255) NOT NULL UNIQUE,
  phone                 varchar(50),
  password_hash        varchar(255) NOT NULL,
  is_active             boolean NOT NULL DEFAULT true,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS app_user_role (
  user_id uuid NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
  role_id uuid NOT NULL REFERENCES role(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

-- Domain profile for a patient
CREATE TABLE IF NOT EXISTS patient (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid NOT NULL UNIQUE REFERENCES app_user(id) ON DELETE CASCADE,
  full_name      varchar(200) NOT NULL,
  date_of_birth  date,
  gender          varchar(20),
  created_at     timestamptz NOT NULL DEFAULT now()
);

-- Domain profile for a doctor
CREATE TABLE IF NOT EXISTS department (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        varchar(150) NOT NULL UNIQUE,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS doctor (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid NOT NULL UNIQUE REFERENCES app_user(id) ON DELETE CASCADE,
  full_name      varchar(200) NOT NULL,
  specialty      varchar(200),
  department_id  uuid REFERENCES department(id) ON DELETE SET NULL,
  created_at     timestamptz NOT NULL DEFAULT now()
);

-- Appointments
CREATE TABLE IF NOT EXISTS appointment (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id          uuid NOT NULL REFERENCES patient(id) ON DELETE CASCADE,
  doctor_id           uuid NOT NULL REFERENCES doctor(id) ON DELETE CASCADE,
  department_id       uuid REFERENCES department(id) ON DELETE SET NULL,
  appointment_time    timestamptz NOT NULL,
  duration_minutes    int NOT NULL,
  status              varchar(30) NOT NULL,
  reason              varchar(500),
  created_at          timestamptz NOT NULL DEFAULT now()
);

-- Seed roles
INSERT INTO role(name)
SELECT 'ROLE_ADMIN'
WHERE NOT EXISTS (SELECT 1 FROM role WHERE name='ROLE_ADMIN');

INSERT INTO role(name)
SELECT 'ROLE_DOCTOR'
WHERE NOT EXISTS (SELECT 1 FROM role WHERE name='ROLE_DOCTOR');

INSERT INTO role(name)
SELECT 'ROLE_PATIENT'
WHERE NOT EXISTS (SELECT 1 FROM role WHERE name='ROLE_PATIENT');

