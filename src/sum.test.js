
import React from "react";
import New from './new';
import {shallow, mount} from "enzyme";

const sum = require('./sum');
let wrapper;

describe("<New/>", () => {

  beforAll(() => {
    wrapper = shallow(<New/>);
  })

  // it('adds 1 + 2 to equal 3', () => {
  //   expect(sum(1, 2)).toBe(3);
  // });

  it("New renderea correctamente", () => {
    expect(wrapper).toBeDefined();
  })
})
