# Sinatra-Angular App on Heroku

Hi, here's My App to University. Subject is complicated, and whole app is in Polish, but you can see how i use Sinatra, Angular and Heroku.

###### Btw. Don't look at permission module, its not finish yet. (definitely dont try to make it like this! If You want make good users role module, You have to check all action on backend side etc. etc.)

* My app can be found at https://edu-study-managment.herokuapp.com/

Because i connected heroku and github repository, grab two links to both of them:

* heroku: https://git.heroku.com/edu-study-managment.git
* github: https://github.com/Villentretenmerth/edu-study-managment

Database dump: 

-- ----------------------------
-- Sequence structure for lista_modulow_id
-- ----------------------------
DROP SEQUENCE IF EXISTS "lista_modulow_id";
CREATE SEQUENCE "lista_modulow_id"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 99999999
 START 3
 CACHE 1;
SELECT setval('"public"."lista_modulow_id"', 3, true);

-- ----------------------------
-- Sequence structure for lista_rocznikow_id
-- ----------------------------
DROP SEQUENCE IF EXISTS "lista_rocznikow_id";
CREATE SEQUENCE "lista_rocznikow_id"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 999999
 START 1
 CACHE 1;
SELECT setval('"public"."lista_rocznikow_id"', 1, true);

-- ----------------------------
-- Sequence structure for lista_wybranych_modulow_id
-- ----------------------------
DROP SEQUENCE IF EXISTS "lista_wybranych_modulow_id";
CREATE SEQUENCE "lista_wybranych_modulow_id"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 99999999
 START 3
 CACHE 1;
SELECT setval('"public"."lista_wybranych_modulow_id"', 3, true);

-- ----------------------------
-- Sequence structure for users_id
-- ----------------------------
DROP SEQUENCE IF EXISTS "users_id";
CREATE SEQUENCE "users_id"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 999999
 START 1
 CACHE 1;
SELECT setval('"public"."users_id"', 1, true);

-- ----------------------------
-- Table structure for admin_permission
-- ----------------------------
DROP TABLE IF EXISTS "admin_permission";
CREATE TABLE "admin_permission" (
"id" int4,
"nazwa" text COLLATE "default"
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of admin_permission
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for kolory_modulow
-- ----------------------------
DROP TABLE IF EXISTS "kolory_modulow";
CREATE TABLE "kolory_modulow" (
"id" int4,
"nazwa" text COLLATE "default"
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of kolory_modulow
-- ----------------------------
BEGIN;
INSERT INTO "kolory_modulow" VALUES ('1', 'Czerwony');
INSERT INTO "kolory_modulow" VALUES ('2', 'Zielony');
INSERT INTO "kolory_modulow" VALUES ('3', 'Niebieski');
COMMIT;

-- ----------------------------
-- Table structure for lista_modulow
-- ----------------------------
DROP TABLE IF EXISTS "lista_modulow";
CREATE TABLE "lista_modulow" (
"id" int4 DEFAULT nextval('lista_modulow_id'::regclass),
"nazwa" text COLLATE "default",
"kolory_modulow_id" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of lista_modulow
-- ----------------------------
BEGIN;
INSERT INTO "lista_modulow" VALUES ('1', 'Fizyka', '1');
INSERT INTO "lista_modulow" VALUES ('2', 'Algebra', '2');
INSERT INTO "lista_modulow" VALUES ('3', 'Programowanie', '3');
COMMIT;

-- ----------------------------
-- Table structure for lista_rocznikow
-- ----------------------------
DROP TABLE IF EXISTS "lista_rocznikow";
CREATE TABLE "lista_rocznikow" (
"id" int4 DEFAULT nextval('lista_rocznikow_id'::regclass),
"nazwa" text COLLATE "default"
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of lista_rocznikow
-- ----------------------------
BEGIN;
INSERT INTO "lista_rocznikow" VALUES ('1', '2016/2017');
COMMIT;

-- ----------------------------
-- Table structure for lista_semestrow
-- ----------------------------
DROP TABLE IF EXISTS "lista_semestrow";
CREATE TABLE "lista_semestrow" (
"id" int4,
"nazwa" text COLLATE "default"
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of lista_semestrow
-- ----------------------------
BEGIN;
INSERT INTO "lista_semestrow" VALUES ('1', 'Semestr 1');
INSERT INTO "lista_semestrow" VALUES ('2', 'Semestr 2');
INSERT INTO "lista_semestrow" VALUES ('3', 'Semestr 3');
INSERT INTO "lista_semestrow" VALUES ('4', 'Semestr 4');
INSERT INTO "lista_semestrow" VALUES ('5', 'Semestr 5');
INSERT INTO "lista_semestrow" VALUES ('6', 'Semestr 6');
INSERT INTO "lista_semestrow" VALUES ('7', 'Semestr 7');
COMMIT;

-- ----------------------------
-- Table structure for lista_wybranych_modulow
-- ----------------------------
DROP TABLE IF EXISTS "lista_wybranych_modulow";
CREATE TABLE "lista_wybranych_modulow" (
"id" int4 DEFAULT nextval('lista_wybranych_modulow_id'::regclass),
"lista_rocznikow_id" int4,
"lista_semestrow_id" int4,
"kolory_modulow_id" int4,
"lista_modulow_id" int4,
"user_id" int4,
"count_lecture" int4,
"count_exercise" int4,
"count_consultation" int4
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of lista_wybranych_modulow
-- ----------------------------
BEGIN;
INSERT INTO "lista_wybranych_modulow" VALUES ('1', '1', '1', '1', '1', null, null, null, null);
INSERT INTO "lista_wybranych_modulow" VALUES ('2', '1', '7', '2', '2', null, null, null, null);
INSERT INTO "lista_wybranych_modulow" VALUES ('3', '1', '1', '3', '3', null, null, null, null);
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
"id" int4 DEFAULT nextval('users_id'::regclass),
"name" text COLLATE "default",
"password" text COLLATE "default",
"ramy_permission" int4,
"korekta_permission" int4,
"admin_permission" int4,
"user_name" text COLLATE "default",
"email" text COLLATE "default",
"surname" text COLLATE "default"
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO "users" VALUES ('1', 'admin', '1234', null, null, '3', 'admin', null, null);
COMMIT;
