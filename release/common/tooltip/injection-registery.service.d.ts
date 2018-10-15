import { ComponentRef } from '@angular/core';
import { InjectionService } from './injection.service';
export declare abstract class InjectionRegistery {
    injectionService: InjectionService;
    protected abstract type: any;
    protected defaults: any;
    protected components: {
        [key: string]: Map<any, any>;
    };
    constructor(injectionService: InjectionService);
    getComponents(category: any): Map<any, any>;
    getByType(type?: any, category?: any): any;
    create(bindings: any, category?: any): any;
    createByType(type: any, bindings: any, category?: any): any;
    destroy(instance: any, category?: any): void;
    destroyAll(category?: any): void;
    destroyByType(type: any, category?: any): void;
    protected assignDefaults(bindings: any): any;
    protected injectComponent(type: any, bindings: any): ComponentRef<any>;
    protected register(type: any, component: any, category?: any): void;
}
