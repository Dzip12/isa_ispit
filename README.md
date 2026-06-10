# ISA Ispit - Prodavnica

Full-stack web aplikacija za jednostavnu online prodavnicu. Projekat se sastoji od Spring Boot backend aplikacije, Next.js frontend aplikacije, MySQL baze podataka i Postman kolekcije za testiranje API-ja.

## Tehnologije

- Backend: Java 21, Spring Boot 3.4.5, Spring Security, JWT, Spring Data JPA, MySQL
- Frontend: Next.js 16, React 19, Axios, Bootstrap, Reactstrap, React Hook Form
- Baza: MySQL
- Alati: Maven wrapper, npm, Postman

## Struktura projekta

```text
.
+-- isa_ispit_jun_backend/
|   +-- isa/                         # Spring Boot backend
+-- isa_ispit_jun_frontend/          # Next.js frontend
+-- postman/                         # Postman API kolekcija
+-- prodavnica.sql                   # SQL dump baze
+-- README.md
```

## Funkcionalnosti

- Registracija i prijava korisnika
- JWT autentifikacija i refresh token
- Pregled proizvoda
- Dodavanje proizvoda u korpu na frontend strani
- Kreiranje porudzbine
- Placanje porudzbine
- Pregled, kreiranje, izmena i brisanje korisnika
- Role korisnika: `admin` i `user`

## Preduslovi

Pre pokretanja instalirati:

- Java 21
- Node.js i npm
- MySQL Server
- Git

## Baza podataka

Projekat koristi MySQL bazu `prodavnica`. SQL dump se nalazi u fajlu `prodavnica.sql`.

Import baze moze da se uradi kroz MySQL alat po izboru, na primer:

```bash
mysql -u root -p < prodavnica.sql
```

Backend konfiguracija baze nalazi se u:

```text
isa_ispit_jun_backend/isa/src/main/resources/application.properties
```

Podrazumevana konfiguracija je:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/prodavnica
spring.datasource.username=root
spring.datasource.password=root
```

Ako lokalna MySQL konfiguracija koristi drugo korisnicko ime, lozinku ili port, potrebno je izmeniti ovaj fajl.

## Pokretanje backend aplikacije

Uci u backend folder:

```bash
cd isa_ispit_jun_backend/isa
```

Pokrenuti aplikaciju:

```bash
./mvnw spring-boot:run
```

Na Windows-u se moze koristiti:

```bash
mvnw.cmd spring-boot:run
```

Backend se pokrece na:

```text
http://localhost:8080
```

## Pokretanje frontend aplikacije

Uci u frontend folder:

```bash
cd isa_ispit_jun_frontend
```

Instalirati zavisnosti:

```bash
npm install
```

Pokrenuti development server:

```bash
npm run dev
```

Frontend se pokrece na:

```text
http://localhost:3000
```

Frontend koristi backend API na adresi `http://localhost:8080`, podeseno u fajlu:

```text
isa_ispit_jun_frontend/src/core/httpClient.js
```

## API pregled

Glavne backend rute:

- `POST /auth/signup` - registracija korisnika
- `POST /auth/login` - prijava korisnika
- `POST /auth/refresh` - osvezavanje access tokena
- `GET /product/get-list` - lista proizvoda
- `GET /user/get-list` - lista korisnika
- `GET /user/get-page-list` - paginirana lista korisnika
- `GET /user/get-user-products-list` - lista korisnickih proizvoda za admin rolu
- `POST /user/create` - kreiranje korisnika
- `PUT /user/update` - izmena korisnika
- `DELETE /user/delete/{id}` - brisanje korisnika
- `POST /order/create` - kreiranje porudzbine
- `PUT /order/pay/{id}` - placanje porudzbine

Postman kolekcija se nalazi u:

```text
postman/ISA_Prodavnica_API.postman_collection.json
```

## Testiranje

Backend testovi se mogu pokrenuti iz foldera `isa_ispit_jun_backend/isa`:

```bash
./mvnw test
```

Na Windows-u:

```bash
mvnw.cmd test
```

Frontend trenutno nema podesene korisne test skripte. U `package.json` postoji `test` skripta koja vraca poruku da testovi nisu definisani.

## Build

Backend build:

```bash
cd isa_ispit_jun_backend/isa
./mvnw clean package
```

Frontend build:

```bash
cd isa_ispit_jun_frontend
npm run build
```

## Napomene

- Pre pokretanja backend-a MySQL server mora biti aktivan.
- Baza mora biti importovana pre testiranja aplikacije kroz frontend.
- CORS je podesen za `http://localhost:3000`.
- JWT token se cuva u browser `localStorage`.
- Ako menjate backend port ili URL, potrebno je uskladiti `baseURL` u frontend HTTP klijentu.