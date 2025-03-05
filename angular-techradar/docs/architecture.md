# Architekturdokumentation

Dieses Dokument beschreibt die Architektur des Technologie-Radars und ist nach Arc42 strukturiert.

# 1. Einführung und Ziele

Dieses Projekt ist im Modul WEBLAB HS24 erstellt und bewertet worden.
Ziel war es, eine Webapplikation zu erstellen, die als Frontend eine Webseite, als Backend eine REST-API und Datenbank beinhaltet.

## 1.1 Aufgabenstellung

Die Aufgabenstellung ist ein Technologieradar.
https://github.com/web-programming-lab/web-programming-lab-projekt/blob/main/Technologie-Radar.md

## 1.2 Qualitätsziele

- Der Technologie-Radar-Viewer soll neben der Desktop-Ansicht, auch für die Mobile-Ansicht optimiert sein.
- Der Technologie-Radar-Viewer soll innert 1s geladen sein.
- Sämtliche Anmeldungen an die Technologie-Radar-Administration werden aufgezeichnet.

## 1.3 Stakeholder

| Rolle                | Erwartungshaltung                                      |
|----------------------|--------------------------------------------------------|
| *Marco Frautschi*    | *Erfüllen der Anforderungen für eine gute Bewertung*   |
| *David Lichtsteiner* | *Erfüllen der Anforderung für das Bestehen des Moduls* |
| *Dominik Witschard*  | *Erfüllen der Anforderung für das Bestehen des Moduls* |

# 2. Randbedingungen

Die Architektur ist vorgegeben. SPA im Frontend, RESTful Backend und eine Datenbank muss verwendet werden.

# 3. Kontext & Abgrenzung

## 3.1. Fachlicher Kontext

Die Applikation dient als Techradar, in dem die aktuellen Technologien der Firma festgehalten werden. Benutzer können Technologien betrachten, und Administratoren können Technologien verwalten (hinzufügen, löschen, bearbeiten, veröffentlichen).

---

## 3.2 Technischer Kontext

### Technologien

- **Frontend:** Angular, JavaScript, TypeScript, SCSS
- **Backend:** Node.js, Express
- **Datenbank:** MongoDB
- **Kommunikation:** REST API zwischen Frontend und Backend, MongoClient für die Verbindung zwischen Backend und der MongoDB (online)

### Externe Schnittstellen

- Das Backend kommuniziert über eine REST-API mit dem Frontend.
- Das Backend greift über den MongoClient auf eine MongoDB-Datenbank in der Cloud zu.

---

# 4. Lösungsstrategie

## 4.1 Überblick

Die Applikation setzt auf eine Single-Page Application (SPA) im Frontend, die mit einem Backend-Server über REST kommuniziert. Dies ermöglicht eine schnelle und reaktive Benutzeroberfläche, da nach dem initialen Laden nur noch Daten nachgeladen werden, ohne die Seite neu zu laden.

## 4.2 Vorteile einer SPA

- **Schnelle Ladezeiten:** Einmaliges Laden der gesamten Applikation und danach nur noch das Nachladen von Daten.
- **Reaktive Benutzererfahrung:** Durch AJAX und REST-Calls werden Interaktionen ohne Verzögerungen ermöglicht.
- **Weniger Serverlast:** Nur Daten werden übertragen, keine vollständigen HTML-Seiten.
- **Einfache Wartbarkeit und Erweiterbarkeit:** Trennung von Frontend und Backend fördert eine modulare Architektur.

---

## 5. Bausteinsicht

### 5.1 Whitebox – Bausteine

- **Technologieverwaltung**: Beinhaltet die Verwaltung der Technologien, die im Techradar angezeigt und bearbeitet werden. Hier können Administratoren Technologien hinzufügen, löschen, bearbeiten und veröffentlichen.

### 5.2 Schnittstellen

- **Frontend-Backend (REST)**: Kommunikation zwischen Frontend und Backend erfolgt über eine REST-API.
- **Backend-Datenbank (MongoClient)**: Das Backend kommuniziert über den MongoClient mit der MongoDB-Datenbank in der Cloud.

### 5.3 Leistungsanforderungen

- Die Applikation muss innerhalb von **1 Sekunde** geladen sein, um eine gute Benutzererfahrung zu gewährleisten.

---

## 6. Laufzeitsicht

### 6.1 Laufzeitszenario – Benutzerlogin

- Der Benutzer öffnet die Anwendung und wird zunächst zum **Login**-Bildschirm weitergeleitet.
- Nach erfolgreichem Login gelangt der Benutzer zum **Technologie-Radar**.
  - **Normale Benutzer** können Technologien nur ansehen.
  - **Administratoren** können Technologien bearbeiten, neu erstellen, löschen und Entwürfe veröffentlichen.

### 6.2 Laufzeitszenario – Benutzerrechte

- Nach dem Login prüft die Applikation die **Benutzerrechte**:
  - Bei Administratorrechten wird dem Benutzer Zugriff auf die Technologieverwaltung gewährt.
  - Bei normalen Benutzerrechten kann der Benutzer nur die Technologien im Techradar einsehen, aber keine Änderungen vornehmen.

---

## 7. Verteilungssicht

### 7.1 Infrastruktur

- **Frontend** und **Backend** laufen auf einem lokalen Server.
- Die **MongoDB** ist in der Cloud gehostet, wodurch hohe Verfügbarkeit und Skalierbarkeit gewährleistet sind.

### 7.2 Infrastrukturmerkmale

- **Server**: Die Applikation nutzt einen dedizierten Server für das Hosting des Frontends und Backends. Dieser ist skalierbar, je nach Last.
- **Cloud-Datenbank**: MongoDB wird als Cloud-Datenbank genutzt, was eine einfache Verwaltung und Skalierung bei Bedarf ermöglicht. https://cloud.mongodb.com

---

# 8. Querschnittliche Konzepte

### Typische Themen in diesem Abschnitt sind:

- **Sicherheit**: Die Sicherheit des Systems wird durch Authentifizierung mithilfe von JWT Tokens gewährleistet, welche auf dem Backend ausgestellt und überprüft werden.
- **Fehlerbehandlung und Logging**: Es wird jede Exception geloggt und bei jedem Logging wird der Benutzername mitgeloggt.

---

# 9. Architekturentscheidungen

### Typische Themen in diesem Abschnitt sind:

- **Entscheidungen zu Technologien**: Angular, Typescript, SCSS, NodeJS, Express und MongoDB wurden gewählt, weil in den Vorlesungen diese Technologien hauptsächlich behandelt wurden und somit schon gewisse Lösungskonzepte vorhanden waren, anhand derer ich mich orientieren und inspirieren konnte.
- **Entscheidungen zur Architektur**: Das Architekturprinzip ist durch die Aufgabenstellung bereits vorgegeben. Eine SPA (Single Page Application) im Frontend und ein RESTful Backend. Die MongoDB ist in der Cloud, um eine hohe Verfügbarkeit und Skalierbarkeit zu gewährleisten, zusätzlich ist der Installationsprozess des Backends somit vereinfacht.
- **Entscheidungen zur Integration**: Die Integration von Frontend und Backend erfolgt über eine REST-API, um eine lose Kopplung zu gewährleisten und die Wartbarkeit zu verbessern. Die Kommunikation zwischen Backend und Datenbank erfolgt über den MongoClient, um eine einfache Verbindung zur MongoDB zu ermöglichen.

## 10. Qualitätsanforderungen

### Leistung

- **Ladezeit**: Die Applikation muss innerhalb von **1 Sekunde** geladen sein.
- **Responsive Design**: Die Applikation muss auf Mobilgeräten gut nutzbar und vollständig responsiv sein.

---

## 11. Risiken und technische Schulden

- **Risiko**: Falls die Applikation nicht innerhalb der vorgegebenen **1 Sekunde** lädt, könnte dies die Benutzererfahrung erheblich beeinträchtigen.
- **Technische Schulden**: Es besteht die Möglichkeit, dass nicht alle Technologien optimal für eine hohe Performance optimiert sind, was in der Zukunft zu einer Performanceverschlechterung führen könnte.

## 12. Glossar

## Glossar

| Begriff         | Definition                                                                                                                                                                                                                                                                                                               |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Techradar**   | Ein Techradar ist ein Tool oder eine visuelle Darstellung, die Unternehmen oder Organisationen hilft, den Überblick über die aktuellen und zukünftigen Technologien zu behalten. Es wird häufig verwendet, um Technologien zu bewerten, zu priorisieren und eine Roadmap für die technologische Entwicklung festzulegen. |
| **SPA**         | Single-Page Application, eine Webanwendung, die nach dem ersten Laden dynamisch Inhalte nachlädt.                                                                                                                                                                                                                        |
| **MongoClient** | Ein MongoDB-Client, der es dem Backend ermöglicht, mit der MongoDB-Datenbank zu kommunizieren.                                                                                                                                                                                                                           |
