import * as _ from 'lodash';
import { throwError, of } from 'rxjs';

export const neverNullable = <T>(data: T) => 
    _.isNil(data)? throwError(new Error()) : of(data as NonNullable<T>)