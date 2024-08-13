CREATE DATABASE TO_DML_JS_SAMPLE;

CREATE OR REPLACE TABLE to_dml_js_sample.public.employees (
    employee_id NUMBER PRIMARY KEY,
    employee_name VARCHAR,
		update_datetime TIMESTAMP_TZ,
    regist_datetime TIMESTAMP_TZ
);

INSERT INTO to_dml_js_sample.public.employees VALUES (1, 'HANAKO', '2024-08-13 15:00:00 +0900', '2024-08-13 15:00:00 +0900');