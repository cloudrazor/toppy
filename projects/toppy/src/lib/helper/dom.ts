import { Injectable } from '@angular/core';
import { ContainerSize } from '../models';

export type Elem = Document | HTMLElement;

@Injectable({
  providedIn: 'root'
})
export class DomHelper {
  html = {
    BODY: document.getElementsByTagName('body')[0]
  };

  createElement(elementName: string, attr = {}): HTMLElement {
    const element = document.createElement(elementName);
    Object.keys(attr).forEach(name => element.setAttribute(name, attr[name]));
    return element;
  }

  insertChildren(parentElement: HTMLElement, ...childElements: HTMLElement[]): HTMLElement {
    let prevParent = parentElement;
    childElements.forEach(elem => {
      prevParent = prevParent.appendChild(elem);
    });
    return prevParent;
  }

  setHtml(parentElement: HTMLElement, childElement: any): HTMLElement {
    parentElement.innerHTML = childElement;
    return parentElement;
  }

  setPositions(element: HTMLElement, positions: object) {
    Object.keys(positions).forEach(prop => {
      element.style[prop] = typeof positions[prop] === 'number' ? `${positions[prop]}px` : positions[prop];
    });
  }

  applySize(element: HTMLElement, size: ContainerSize) {
    const { width, height } = size;
    Object.keys(size).forEach(attr => {
      return (element.style[attr] = size[attr]);
    });
  }

  removeElement(element: HTMLElement) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  addClassNameToBody(className: string) {
    document.querySelector('body').classList.add(className);
  }
  removeClassNameFromBody(className: string) {
    document.querySelector('body').classList.remove(className);
  }
}
