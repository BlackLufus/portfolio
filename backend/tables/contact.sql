create user {DB_USER} with password {DB_PASSWORD};
grant all privileges on database {DB_NAME} to {DB_USER};

create table contact(
	id serial primary key,
	first_name varchar(64) not null,
	last_name varchar(64) not null,
	email varchar(255),
	message varchar(1000) not null,
	created_at timestamp not null default now(),
	updated_at timestamp not null default now()
);