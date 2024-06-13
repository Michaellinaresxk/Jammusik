import { describe, expect, test } from "@jest/globals";
import { render } from "@testing-library/react-native";
import { sum } from "./sum";
import App from "../src/App";
import renderer from "react-test-renderer";
import { HomeScreen } from "../src/UI/pages/home/HomeScreen";

describe("sum module", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
  // test("HomeScreen is renders correctly", () => {
  //   const tree = renderer.create(<HomeScreen />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});

// describe("<App />", () => {
//   let component;
//   beforeEach(() => {
//     component = render(<App />);
//   });

//   test("Render Correctly", () => {
//     expect(component).toBeDefined();
//   });
// });
