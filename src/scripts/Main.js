//import * as THREE from 'three';

import { Expression } from "three/examples/jsm/transpiler/AST.js";
import Experience from "./Experience.js";

class Main {
  constructor() {
    this.init();
  }

  init() {
    new Experience();
  }
}

new Main();