select 
	p.image,
	pt.title,
	pt.description, 
	pt.categorie, 
	coalesce(pt.labels, '[]') as labels,
	coalesce(pt.features, '[]') as features,
	coalesce(json_agg(
        json_build_object(
            'name', pln.name,
            'url', pl.url
        )
    ) FILTER (WHERE pl.project_id is not null), '[]') AS links
from project p 
inner join project_translation pt on pt.project_id = p.id and pt.language_id = 1
left join project_link pl on pl.project_id  = p.id
LEFT JOIN project_link_translation pln 
    ON pln.project_link_id = pl.project_link_id 
   AND pln.language_id = 1
group by p.id, pt.title, pt.description, pt.categorie, pt.labels, pt.features
order by p.id asc;
