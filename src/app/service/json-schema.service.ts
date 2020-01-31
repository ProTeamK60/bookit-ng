import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ajv } from 'ajv';

export const AJV_INSTANCE = new InjectionToken<Ajv>('The AJV Class Instance');

/**
 * The response of a validation result
 */
export interface ValidateResult {
  /**
   * If the result is valid or not
   */
  isValid: boolean;

  /**
   * Error text from the validator
   */
  errorsText: string;
}


@Injectable({
  providedIn: 'root'
})
export class JSONSchemaService {
  constructor(private readonly http: HttpClient, @Inject(AJV_INSTANCE) private readonly ajv: Ajv) {}

  /**
   * Fetches the Schema and adds it to the validator schema set
   * @param name The name of the schema, this will be used as the key to store it
   * @param urlPath The URL path of the schema to load
   */
  public loadSchema(name: string, urlPath: string): void {
    // console.log('urlpath: ' + urlPath.toString())
    this.http.get(urlPath).subscribe(result => this.ajv.addSchema(result, name));
  }

  /**
   * Validate data against a schema
   * @param name The name of the schema to validate
   * @param data The data to validate
   */
  public validateData<T>(name: string, data: T): ValidateResult {
    const isValid = this.ajv.validate(name, data) as boolean;
    return { isValid, errorsText: this.ajv.errorsText() };
  }
}
