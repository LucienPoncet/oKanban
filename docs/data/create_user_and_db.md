# Création de l'utilisateur et de la base de données pour okanban

[cf fiche kourou postgres](https://kourou.oclock.io/ressources/fiche-recap/postgresql/)


## Créer le user et la bdd

```shell
sudo -u postgres psql
```

-> on est dans le logiciel psql en tant qu'utilisateur postgres

```sql
-- CREA USER
CREATE USER okanban_u WITH PASSWORD 'okanban_p';

-- CREA BDD pour ce USER
CREATE DATABASE okanban_db OWNER okanban_u;

exit (ou \q)

```

-> on sort de psql et on redevient student  (ou teacher pour le prof)

## Tester

```shell
psql -U okanban_u -d okanban_db

# PUIS on saisit le password

```

-> tada, on a vérifier qu'on est bon !