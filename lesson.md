# 2.7 Conditional Rendering and Lists

## Preparation

Fork and clone the [lesson repo](https://github.com/su-ntu-ctp/6m-software-2.7-cond-render-lists.git) from GitHub. 

## Lesson Overview

In this lesson, we will discuss a couple of component rendering techniques that are commonly used in React applications. Part 1 demonstrates how to conditionally render a component's UI elements according to its state variable. Part 2 demonstrates how to convert an array into a list in JSX using ES6 methods. 

We will apply these techniques to build a **CRUD** application that includes four basic operations in persistent storage, i.e. **C**reate, **R**emove, **U**pdate and **D**elete.

## Part 1: Conditional Rendering

React components have the ability to render UI elements according to its current state. In this example we will conditionally render our `Product` component UI in either light or dark mode, with the help of several ES6 operators.

### Preparation for Part 1

Copy the starter code for part-1 and start the React app.

```
cd apps
cp -r part-1-begin work-1

cd work-1
npm start
```

There are three methods to do conditional rendering:
1. Using if-else statements
2. Using ternary conditions
3. Using short circuit evaluations

### Step 1: Creating the state and handler function

For this demonstration, we will toggle the visibility of the ViewList component. In order to achieve this, we need to create the state and the handler function to toggle the state. We also need to create a button to handle the event.

In Product.js, create a new state called showItem and set its initial value to false. Then create the handler function called handleShowItem. 

```js
//Product.js
...
const [showItem, setShowItem] = useState(false);
...

const handleShowItem = () => {
  setShowItem(!showItem);
}
...

//In JSX
...
<Button label="Show Cart" onClick={handleShowItem}/>
<ViewList list={list} sum={sumTotal} />
...
```

### Step 2, Method 1: Using if-else statements 
If-else statements can be used to determine which elements can be rendered. 

Add the following logic in Product.js, and replace the ViewList in JSX with listComponent
```js
//Product.js
let listComponent = null;
if(showItem){
  listComponent = <ViewList list={list} sum={sumTotal} />
} else {
  listComponent = null;
}

//In JSX
<Button label="Show Cart" onClick={handleShowItem}/>
{listComponent}
```
JSX can be assigned to variables and these variables can be used in the render function.

Test out the conditional rendering by clicking the button and see if the ViewList component toggles.

### Step 2, Method 2: Using ternary conditions

Ternary conditions can be used to render components. The ternary component follows the syntax:

```
condition ? expression if true : expression if false
```

Using the state as the condition, different components can be displayed based on the value of the state.

In Product.js, remove / comment out the if-else and the listComponent created earlier and replace it with the following code:

```js
//Product.js
{ showItem ? <ViewList list={list} sum={sumTotal} /> : null }
```

Test out the conditional rendering by clicking the button and see if the ViewList component toggles.

### Step 2, Method 3: Using short circuit evaluations 

Short circuit evaluation uses logical operations AND and OR (&& and ||) to determine the result. If the first condition is true, it will run the statement after the operation.

In Product.js, remove / comment out the ternary expression created earlier and replace it with the following code:

```js
{ showItem && <ViewList list={list} sum={sumTotal} />}
```
If the state is true, it will render the ViewList component. If the state is false, it will hide the component.

Test out the conditional rendering by clicking the button and see if the ViewList component toggles.

## Part 2: Rendering Arrays as Lists

### Preparation for Part 2

Copy the starter code for part-2 and start the React app. We will be using a new template to do the second part of the lesson.

```
cd apps
cp -r part-2-begin work-2

cd work-2
npm start
```

For this section, we need to install an external library to generate unique IDs:

```
npm install uuid
```

UUID is an identifier that is unique that is of fixed size and contains a time field. A UUID can be used for multiple purposes, from tagging objects to reliably identifying persistent objects across a network.

uuid is an external js library that is used to create UUIDs to be used as keys. 

Change into your work folder and start the React app.

```
cd work-2
npm start
```

### What is CRUD?

When testing out a new programming language or framework, we often build a basic application to check out its functionalities. A popular application used for this purpose is a CRUD application:

| Action | Description |
|---|---|
| **Create** | Add a new record to a list or database |
| **Read** | View an existing record |
| **Update** | Edit and update an existing record |
| **Delete** | Remove an existing record |

In the previous chapters, we have already done **Create** and **Read** part of the app, refer to `handlerAddProduct` in `Product.js` and the `ViewList.js` component. In this section, we will complete the CRUD app by adding **Update** and **Delete** functions.

### Step 1: Add Delete UI Element and Handler

Insert a new column in the `ViewList` table to display a delete button and enable its `onClick` handler:

```js
// ViewList.js
return (
  ...
  <thead>
    <tr>
      ...
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
      <tr ...>   
        ...
        <td>{item.total.toFixed(2)}</td>
        <td onClick={() => console.log('Delete handler here...')}>❌</td>
      </tr>
    ...
  </tbody>
)
```

The `onClick` attribute receives an anonymous arrow function to allow `handlerDeleteItem(...)` to be passed as a function. Otherwise, the handler will be exectuted immediately during rendering. 

Test the delete button by pressing it and observing the console log output.

Next, `ViewList` must receive the delete handler from its parent `Product`, where the product list state is held. Change the function component to accept the handler as a prop and pass it to `onClick` as a function.

```js
// ViewList.js
...
function ViewList({ list, sum, handlerDeleteItem }) {
  ...
  return(
    ...
    <td onClick={() => handlerDeleteItem(item.id)}>❌</td>
    ...
  )
}
```

### Step 2: Add Unique ID to Product Item

In order to delete the selected item from the product list, we need to create a unique ID for each list item. Import the `uuid` function and use it to generate a unique ID during item creation:

> Don't forget to install the 'uuid' npm library!

```js
// Product.js
import { v4 as uuid } from 'uuid';
...
const handlerAddProduct = () => {
  const newItem = {
    id: uuid(),
    ...
  }
}
```
In `ViewList`, change the `<tr key={...} />` attribute to make use of the new `item.id`:

```js
// ViewList.js
  ...
  {list.map((item) => (
    <tr key={item.id}>
  ))}
  ...
```

> React developers recommend the use of uniquely generated IDs for list `key` attributes, instead of simple index keys. This will ensure proper re-rendering of list items in the DOM.

### Step 3: Add Delete Handler Function and Pass as a Prop

Add the delete handler function:

```js
// Product.js
...
const handlerDeleteProduct = (id) => {
  const newList = list.filter((item) => item.id !== id);
  setList(newList);
}
...
```

Pass the delete handler to `ViewList` as a prop:

```js
// Product.js
...
return(
  ...
  <ViewList
    ...
    handlerDeleteItem={handlerDeleteProduct}
  >
)
```

There are many techniques to remove an item from an array in Javascript and this is just one of the popular ones. To delete an item from the list, apply the ES6 `filter` method to list to create a new list that includes every item in the current list, except for the item with the delete ID parameter. 

The **Delete** function should work now.

### Assignment: Add Edit UI Element

The **Update** part of the app is more complex as it requires a few functional steps:

1. Click on an EDIT button to select the item
2. Show values in a form for editing
3. Submit the form to update the item in the list

The steps are broken down into three helper functions in `Product.js`:

`HandlerEditForm --> HandlerUpdateForm --> HandlerSubmitForm`

First, add the Edit button and prop handler to `ViewList.js`:
The following elements also needs to create:
1. A button to show the edit form for each item
2. An edit form with the fields for the name, quantity, price, and discount
3. Two buttons in the form to submit the changes and to cancel the editing

### Optional Assignments

**Task 1**

A user can press the 'Delete' button while editing the same item, which can cause the list to be updated incorrectly when the form is submitted. Modify the code to prevent the user from deleting am item while it is being edited.

> Hint: Use the `isEditing` flag to check if user is in edit mode

**Task 2 (Challenging)**

Refactor `Product.js` to split the editing form into a separate component, e.g. `EditForm.js`. You may use props to share data between the parent and new child component. 







