create user {DB_USER} with password {DB_PASSWORD};
grant all privileges on database {DB_NAME} to {DB_USER};

create table contact(
	id serial primary key,
	email varchar(255) not null,
	text varchar(2000) not null,
	created_at timestamp not null default now(),
	updated_at timestamp not null default now()
);