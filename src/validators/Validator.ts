export interface Validator<M> {
  validate(model: M): void;
}
