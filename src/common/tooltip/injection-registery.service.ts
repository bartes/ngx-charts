import { ComponentRef } from '@angular/core';
import { InjectionService } from './injection.service';

const DEFAULT_CATEGORY = 'general';

export abstract class InjectionRegistery {

  protected abstract type: any;

  protected defaults: any = {};
  protected components: {[key: string]: Map<any, any>} = {};

  constructor(public injectionService: InjectionService) { }

  getComponents(category) {
    const usedCategory = category || DEFAULT_CATEGORY;
    if(!this.components[usedCategory]) {
      this.components[usedCategory] = new Map();
    }
    return this.components[usedCategory];
  }

  getByType(type: any = this.type, category?) {
    return this.getComponents(category).get(type);
  }

  create(bindings: any, category?): any {
    return this.createByType(this.type, bindings, category);
  }

  createByType(type: any, bindings: any, category?): any {
    bindings = this.assignDefaults(bindings);

    const component = this.injectComponent(type, bindings);
    this.register(type, component, category);

    return component;
  }

  destroy(instance, category?): void {
    const compsByType = this.getComponents(category).get(instance.componentType);

    if(compsByType) {
      const idx = compsByType.indexOf(instance);

      if(idx > -1) {
        const component = compsByType[idx];
        component.destroy();
        compsByType.splice(idx, 1);
      }
    }
  }

  destroyAll(category?): void {
    this.destroyByType(this.type, category);
  }

  destroyByType(type, category?): void {
    const comps = this.getComponents(category).get(type);

    if(comps) {
      for(const comp of comps) {
        this.destroy(comp, category);
      }
    }
  }

  protected assignDefaults(bindings): any {
    const { inputs, outputs } = this.defaults;

    if(!bindings.inputs && !bindings.outputs) {
      bindings = { inputs: bindings };
    }

    if(inputs) {
      bindings.inputs = Object.assign(inputs, bindings.inputs);
    }

    if(outputs) {
      bindings.outputs = Object.assign(outputs, bindings.outputs);
    }

    return bindings;
  }

  protected injectComponent(type, bindings): ComponentRef<any> {
    return this.injectionService.appendComponent(type, bindings);
  }

  protected register(type, component, category?): void {
    const components = this.getComponents(category);
    if(!components.has(type)) {
      components.set(type, []);
    }

    const types = components.get(type);
    types.push(component);
  }

}
