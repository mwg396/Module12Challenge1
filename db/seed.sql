USE workDB;

INSERT INTO department (name)
VALUES 
("Coaches"),
("Players"),
("Trainers"),
("Front Office");

INSERT INTO role (title, salary, department_id)
VALUES 
("Head Coach", 1200000, 1),
("Quarterback", 50000000, 2),
("Head Physical Therapist", 240000, 3),
("General Manager", 12500000, 4),
("Hybrid Linebacker", 5000000, 2);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Dak", "Prescott", 2, 1),
("Mike", "McCarthy", 1, 2),
("Jerry ", "Jones", 4, 3),
("Jeff", "Cavelier", 3, 4),
("Micah", "Parsons", 5, 5)
