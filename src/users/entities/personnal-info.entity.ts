import { Column } from 'typeorm';

export class PersonnalInfo {
  @Column()
  personnalCity: string;

  @Column()
  personnalCountryBirth: string;

  @Column()
  proofidentity: string;
}
