import { IOption } from 'ng-select';

export class Country implements IOption{
    label: string;
    value: string;
    country_id: string;
    country_name: string;
}