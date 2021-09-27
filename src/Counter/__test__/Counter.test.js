import React  from "react";
import Counter from "../Counter";
// Import Package
import { render, fireEvent } from "@testing-library/react"; // render dùng để test UI,  fireEvent dùng để test function
import "@testing-library/jest-dom/extend-expect";

let getByTestId;

// Trước khi chạy từng test => Do something
beforeEach(() => {
    // Lấy ra component muốn test
    const component = render(<Counter/>);
    // Gán biến global để các test khác có thể gọi
    getByTestId = component.getByTestId
})

// Ta sẽ viết kịch bản chi tiết cho từng test. Nó sẽ tự chạy từ a đến z. Khi ta viết xong kịch bản và chạy nó sẽ từ kiểm tra không cần ta phải tương tác.Ta sẽ viết kịch bản test xong rồi mới viết code

// TEST UI
test("Header Renders With Correct Text", () => {
    // Lấy ra Dom Element chi tiết muốn test
    const headerEle = getByTestId("header");
    // Kết quả mong đợi: Hiển thị ra chữ My Counter
    expect(headerEle.textContent).toBe("My Counter");
})

test("Couter Initially Start With Text Of 0", () => {
    // Lấy ra Dom Element chi tiết muốn test
    const counterEle = getByTestId("counter");
    // Kết quả mong đợi: Hiển thị ra chữ số 0
    expect(counterEle.textContent).toBe("0");
})

test("Input contains initial value of 1", () => {
    // Lấy ra Dom Element chi tiết muốn test
    const inputEle = getByTestId("input");
    // Kết quả mong đợi: Hiển thị ra số 1
    expect(inputEle.value).toBe("1");
})

test("Add Button Renders With +", () => {
    const addBtn = getByTestId("add-btn");
    expect(addBtn.textContent).toBe("+");
})

test("Subtract Button Renders With -", () => {
    const subtractsBtn = getByTestId("subtract-btn");
    expect(subtractsBtn.textContent).toBe("-");
})

// TEST FUNCTION
test("Change Value Of Input Works Correctly", () => {
    const inputEle = getByTestId("input");
    // Giá trị lúc chưa thay đổi là 1 (chưa thực hiện sự kiện change)
    expect(inputEle.value).toBe("1");
    // Thực thi sự kiện change: Thay đổi value của input thành 5 (e.target.value)
    fireEvent.change(inputEle, {
        target: {
            value: "5"
        }
    });
    // Giá trị lúc thay đổi là 5 (đã thực hiện sự kiện change)
    expect(inputEle.value).toBe("5");
})

test("Click On Subtract Btn Substract 1 From Counter", () => {
    const counterEle = getByTestId("counter");
    const subtractBtn = getByTestId("subtract-btn");
    // Giá trị lúc chưa thay đổi là 0 (chưa thực hiện sự kiện click)
    expect(counterEle.textContent).toBe("0");
    // Thực thi sự kiện click nút -
    fireEvent.click(subtractBtn);
    // Giá trị lúc thay đổi là -1 (đã thực hiện sự kiện click)
    expect(counterEle.textContent).toBe("-1");
})

test("Click On Plus Btn Add 1 From Counter", () => {
    const counterEle = getByTestId("counter");
    const addBtn = getByTestId("add-btn");
    // Giá trị lúc chưa thay đổi là 0 (chưa thực hiện sự kiện click)
    expect(counterEle.textContent).toBe("0");
    // Thực thi sự kiện click nút +
    fireEvent.click(addBtn);
    // Giá trị lúc thay đổi là 1 (đã thực hiện sự kiện click)
    expect(counterEle.textContent).toBe("1");
})

test("Changing Input Value Then Clicking On Add Btn Works Correctly", () => {
    const counterEle = getByTestId("counter");
    const inputEle = getByTestId("input");
    const addBtn = getByTestId("add-btn");
    // Thực thi sự kiện change: Thay đổi value của input thành 5 (e.target.value)
    fireEvent.change(inputEle, {
        target: {
            value: "5"
        }
    })
    // Thực thi sự kiện click nút +
    fireEvent.click(addBtn);
    // Hiển thị kết quả mong đợi là 5
    expect(counterEle.textContent).toBe("5");
})

test("Changing Input Value Then Clicking On Subtract Btn Works Correctly", () => {
    const counterEle = getByTestId("counter");
    const inputEle = getByTestId("input");
    const subtract = getByTestId("subtract-btn");
    // Thực thi sự kiện change: Thay đổi value của input thành 5 (e.target.value)
    fireEvent.change(inputEle, {
        target: {
            value: "5"
        }
    })
    // Thực thi sự kiện click nút -
    fireEvent.click(subtract);
    // Hiển thị kết quả mong đợi là -5
    expect(counterEle.textContent).toBe("-5");
})

test("Adding And Then Substracting Leads To The Correct Counter Number", () => {
    const addBtn = getByTestId("add-btn");
    const subtractBtn = getByTestId("subtract-btn");
    const counterEle = getByTestId("counter");
    const inputEle = getByTestId("input");
    
    fireEvent.change(inputEle, {
        target: {
            value: "10"
        }
    });
    // => 10
    fireEvent.click(addBtn);
    fireEvent.click(addBtn);
    fireEvent.click(addBtn);
    fireEvent.click(addBtn);
    // => 40
    fireEvent.click(subtractBtn);
    fireEvent.click(subtractBtn);
    // => 20
    expect(counterEle.textContent).toBe("20");
    fireEvent.change(inputEle, {
        target: {
            value: "5"
        }
    });
    fireEvent.click(addBtn);
    // => 25
    fireEvent.click(subtractBtn);
    fireEvent.click(subtractBtn);
    // => 15
    expect(counterEle.textContent).toBe("15");
})

test("Counter Contains Correct ClassName", () => {
    const addBtn = getByTestId("add-btn");
    const subtractBtn = getByTestId("subtract-btn");
    const counterEle = getByTestId("counter");
    const inputEle = getByTestId("input");
    // Class đang là rỗng
    expect(counterEle.className).toBe("");
    fireEvent.change(inputEle, {
        target: {
            value: "50"
        }
    });
    fireEvent.click(addBtn);
    // => 50
    expect(counterEle.className).toBe("");
    fireEvent.click(addBtn);
    // => 100
    expect(counterEle.className).toBe("green");
    fireEvent.click(addBtn);
    // => 150
    expect(counterEle.className).toBe("green");
    fireEvent.click(subtractBtn);
    fireEvent.click(subtractBtn);
    // => 50
    expect(counterEle.className).toBe("");
    fireEvent.click(subtractBtn);
    fireEvent.click(subtractBtn);
    fireEvent.click(subtractBtn);
    fireEvent.click(subtractBtn);
    // => -150
    expect(counterEle.textContent).toBe("-150");
    expect(counterEle.className).toBe("red");
})