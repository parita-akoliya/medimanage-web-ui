export interface CallbackFunctions {
    onCallSuccess: GeneratorFunction | void;
    onCallFail: GeneratorFunction | void;
}

export interface Actions {
    type: string;
    payload?: any;
    error?: any;
    callbacks?: CallbackFunctions | void
}