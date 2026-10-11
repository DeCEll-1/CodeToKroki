import type { Notyf as NotyfClass } from '../types/notyf';
import * as pakoModule from '../types/pako/deflate';

declare global {
    var Notyf: typeof NotyfClass;
    var pako: typeof pakoModule;
}