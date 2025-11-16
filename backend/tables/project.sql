create table project (
	id serial primary key,
	image varchar(100) not null,
	created_at timestamp not null default now(),
	updated_at timestamp not null default now()
);

create table language (
	id serial primary key,
	code varchar(2) unique not null,
	name varchar(100) not null
);

create table project_translation (
	project_id int not null references project(id) on delete cascade,
	language_id int not null references language(id) on delete cascade,
	title varchar(100) not null,
	description varchar(9999) not null,
	categorie varchar(100) not null,
	labels jsonb,
	features jsonb,
	unique(project_id, language_id)
);

create table project_link (
	project_link_id serial primary key,
	project_id int not null references project(id) on delete cascade,
	url varchar(100) not null
);

create table project_link_translation ( 
	project_link_id int not null references project_link(project_link_id) on delete cascade,
	language_id int not null references language(id) on delete cascade,
	name varchar(100) not null,
	unique(project_link_id, language_id)
);