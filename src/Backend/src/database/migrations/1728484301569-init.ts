import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1728484301569 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            -- Création de la table Users pour stocker les utilisateurs
            CREATE TABLE Users (
                user_id SERIAL PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Création de la table Locations pour stocker les localisations des utilisateurs (si partagées)
            CREATE TABLE Locations (
                location_id SERIAL PRIMARY KEY,
                user_id INT,
                latitude DECIMAL(9,6),
                longitude DECIMAL(9,6),
                address VARCHAR(255),
                FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE SET NULL
            );

            -- Création de la table MissingPersons pour stocker les personnes disparues
            CREATE TABLE MissingPersons (
                person_id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                photo_url VARCHAR(255),
                age INT,
                height VARCHAR(50),
                last_seen_date DATE,
                description TEXT,
                latitude DECIMAL(9,6),
                longitude DECIMAL(9,6),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Création de la table Reports pour les signalements supplémentaires des utilisateurs
            CREATE TABLE Reports (
                report_id SERIAL PRIMARY KEY,
                user_id INT,
                person_id INT,
                photo_url VARCHAR(255),
                description TEXT,
                reported_location_lat DECIMAL(9,6),
                reported_location_long DECIMAL(9,6),
                report_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
                FOREIGN KEY (person_id) REFERENCES MissingPersons(person_id) ON DELETE CASCADE
            );

            -- Indexation géographique des localisations pour des recherches efficaces
            CREATE INDEX idx_locations_lat_long ON Locations (latitude, longitude);
            CREATE INDEX idx_missingpersons_lat_long ON MissingPersons (latitude, longitude);

            -- Indexation des rapports pour retrouver rapidement les informations liées aux signalements
            CREATE INDEX idx_reports_person ON Reports (person_id);
            CREATE INDEX idx_reports_user ON Reports (user_id);
        `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
