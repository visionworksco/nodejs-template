import { ApplicationRoles } from '../role/application/ApplicationRoles';

export class Context {
  private static instance: Context; // Singleton
  readonly applicationRoles: ApplicationRoles;

  private constructor() {
    this.applicationRoles = new ApplicationRoles();
  }

  static getInstance(): Context {
    if (!Context.instance) {
      Context.instance = new Context();
    }
    return Context.instance;
  }
}
