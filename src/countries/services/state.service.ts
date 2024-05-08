import { Injectable } from '@nestjs/common';
import { StateRepository } from '../repositories/state.repository';

@Injectable()
export class StateService {
  constructor(private stateRepository: StateRepository) {}

  findAll() {
    try {
      return this.stateRepository.find();
    } catch (err) {
      console.log(err);
    }
  }
}
