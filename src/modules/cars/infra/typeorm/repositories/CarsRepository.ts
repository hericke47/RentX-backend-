import { getRepository, Repository, Not, Between } from 'typeorm';

import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';

import Car from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  public async findAll(): Promise<Car[] | undefined> {
    const cars = await this.ormRepository.find();

    return cars;
  }

  public async findNot(id: String): Promise<Car[] | undefined> {
    const car = await this.ormRepository.find({
      where: {
        id: Not(id),
      },
    });

    return car;
  }

  public async findById(id: string): Promise<Car | undefined> {
    const car = await this.ormRepository.findOne(id);

    return car;
  }

  public async findAllByIds(id: string[]): Promise<Car[] | undefined> {
    const car = await this.ormRepository.findByIds(id);

    return car;
  }

  public async findByValueRange(
    from: number,
    to: number,
  ): Promise<Car[] | undefined> {
    const cars = await this.ormRepository.find({
      where: { daily_value: Between(from, to) },
    });

    return cars;
  }

  public async findByName(name: string): Promise<Car | undefined> {
    const car = await this.ormRepository.findOne({
      where: { name },
    });

    return car;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async create(carData: ICreateCarDTO): Promise<Car> {
    const car = this.ormRepository.create(carData);

    await this.ormRepository.save(car);

    return car;
  }

  public async save(car: Car): Promise<Car> {
    return this.ormRepository.save(car);
  }
}

export default CarsRepository;
