var DEFAULT_CATEGORY = 'general';
var InjectionRegistery = /** @class */ (function () {
    function InjectionRegistery(injectionService) {
        this.injectionService = injectionService;
        this.defaults = {};
        this.components = {};
    }
    InjectionRegistery.prototype.getComponents = function (category) {
        var usedCategory = category || DEFAULT_CATEGORY;
        if (!this.components[usedCategory]) {
            this.components[usedCategory] = new Map();
        }
        return this.components[usedCategory];
    };
    InjectionRegistery.prototype.getByType = function (type, category) {
        if (type === void 0) { type = this.type; }
        return this.getComponents(category).get(type);
    };
    InjectionRegistery.prototype.create = function (bindings, category) {
        return this.createByType(this.type, bindings, category);
    };
    InjectionRegistery.prototype.createByType = function (type, bindings, category) {
        bindings = this.assignDefaults(bindings);
        var component = this.injectComponent(type, bindings);
        this.register(type, component, category);
        return component;
    };
    InjectionRegistery.prototype.destroy = function (instance, category) {
        var compsByType = this.getComponents(category).get(instance.componentType);
        if (compsByType) {
            var idx = compsByType.indexOf(instance);
            if (idx > -1) {
                var component = compsByType[idx];
                component.destroy();
                compsByType.splice(idx, 1);
            }
        }
    };
    InjectionRegistery.prototype.destroyAll = function (category) {
        this.destroyByType(this.type, category);
    };
    InjectionRegistery.prototype.destroyByType = function (type, category) {
        var comps = this.getComponents(category).get(type);
        if (comps) {
            for (var _i = 0, comps_1 = comps; _i < comps_1.length; _i++) {
                var comp = comps_1[_i];
                this.destroy(comp, category);
            }
        }
    };
    InjectionRegistery.prototype.assignDefaults = function (bindings) {
        var _a = this.defaults, inputs = _a.inputs, outputs = _a.outputs;
        if (!bindings.inputs && !bindings.outputs) {
            bindings = { inputs: bindings };
        }
        if (inputs) {
            bindings.inputs = Object.assign(inputs, bindings.inputs);
        }
        if (outputs) {
            bindings.outputs = Object.assign(outputs, bindings.outputs);
        }
        return bindings;
    };
    InjectionRegistery.prototype.injectComponent = function (type, bindings) {
        return this.injectionService.appendComponent(type, bindings);
    };
    InjectionRegistery.prototype.register = function (type, component, category) {
        var components = this.getComponents(category);
        if (!components.has(type)) {
            components.set(type, []);
        }
        var types = components.get(type);
        types.push(component);
    };
    return InjectionRegistery;
}());
export { InjectionRegistery };
//# sourceMappingURL=injection-registery.service.js.map