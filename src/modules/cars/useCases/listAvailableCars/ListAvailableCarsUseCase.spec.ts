import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });
  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car",
      description: "Description Car1",
      daily_rate: 150,
      license_plate: "ABC-1234",
      fine_amount: 80,
      brand: "Brand",
      category_id: "0de4c7bd-2487-4958-87d7-0abfe89fdd4a",
    });
    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Description Car1",
      daily_rate: 150,
      license_plate: "ABC-1234",
      fine_amount: 80,
      brand: "Car_brand",
      category_id: "0de4c7bd-2487-4958-87d7-0abfe89fdd4a",
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Description Car1",
      daily_rate: 150,
      license_plate: "ABC-1234",
      fine_amount: 80,
      brand: "Car_brand",
      category_id: "0de4c7bd-2487-4958-87d7-0abfe89fdd4a",
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: "Car2",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Description Car1",
      daily_rate: 150,
      license_plate: "ABC-1234",
      fine_amount: 80,
      brand: "Car_brand",
      category_id: "Category car",
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "Category car",
    });

    expect(cars).toEqual([car]);
  });
});
