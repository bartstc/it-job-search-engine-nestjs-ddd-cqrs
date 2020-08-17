import { MigrationInterface, QueryRunner } from 'typeorm';

export class FillOffers1597679177575 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO offers (offerId, title, description, companyName, technology, level, employmentType, cityName, streetName, priceMin, priceMax, currency, longitude, latitude)
            VALUES ('ace36259-eb62-4c1e-a0eb-75b7de29d012', 'React Developer', 'test', 'Madkom', 'javascript', 'junior', 'b2b', 'Gdynia', 'Al. Zwycięstwa', '2000', '4000', 'PLN', '90.1234', '120.2234'),
            ('ace36259-eb62-4c1e-a0eb-75b7de29d013', 'React Developer', 'test', 'Madkom', 'javascript', 'junior', 'b2b', 'Gdynia', 'Al. Zwycięstwa', '2000', '4000', 'PLN', '90.1234', '120.2234'),
            ('ace36259-eb62-4c1e-a0eb-75b7de29d014', 'React Developer', 'test', 'Madkom', 'javascript', 'junior', 'b2b', 'Gdynia', 'Al. Zwycięstwa', '2000', '4000', 'PLN', '90.1234', '120.2234')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
