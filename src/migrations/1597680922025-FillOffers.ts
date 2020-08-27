import { MigrationInterface, QueryRunner } from 'typeorm';

export class FillOffers1597680922025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO offers (offer_id, title, description, technology, level, employment_type, city_name, street_name, price_min, price_max, currency, longitude, latitude, must_have, nice_to_have)
            VALUES ('ace36259-eb62-4c1e-a0eb-75b7de29d012', 'React Developer', 'test', 'javascript', 'junior', 'b2b', 'Gdynia', 'Al. Zwycięstwa', '2000', '4000', 'PLN', '90.1234', '120.2234', '{}', '{}'),
            ('ace36259-eb62-4c1e-a0eb-75b7de29d013', 'React Developer', 'test', 'javascript', 'junior', 'b2b', 'Gdynia', 'Al. Zwycięstwa', '2000', '4000', 'PLN', '90.1234', '120.2234', '{}', '{}'),
            ('ace36259-eb62-4c1e-a0eb-75b7de29d014', 'React Developer', 'test', 'javascript', 'junior', 'b2b', 'Gdynia', 'Al. Zwycięstwa', '2000', '4000', 'PLN', '90.1234', '120.2234', '{}', '{}')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
