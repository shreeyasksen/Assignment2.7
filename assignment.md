## Assignment

### Brief

The **Update** part of the app is more complex as it requires a few functional steps:

1. Click on an EDIT button to select the item
2. Show values in a form for editing
3. Submit the form to update the item in the list

The steps are broken down into three helper functions in `Product.js`:

`HandlerEditForm --> HandlerUpdateForm --> HandlerSubmitForm`

First, add the Edit button and prop handler to `ViewList.js`:
The following elements also needs to be created:
1. A button to show the edit form for each item
2. An edit form with the fields for the name, quantity, price, and discount
3. Two buttons in the form to submit the changes and to cancel the editing

### Optional Tasks

**Task 1**

A user can press the 'Delete' button while editing the same item, which can cause the list to be updated incorrectly when the form is submitted. Modify the code to prevent the user from deleting am item while it is being edited.

> Hint: Use the `isEditing` flag to check if user is in edit mode

**Task 2 (Challenging)**

Refactor `Product.js` to split the editing form into a separate component, e.g. `EditForm.js`. You may use props to share data between the parent and new child component. 


### Submission 

- Submit the URL of the GitHub Repository that contains your work to NTU black board.
- Should you reference the work of your classmate(s) or online resources, give them credit by adding either the name of your classmate or URL. 

### References

_Example of Referencing Classmate_

Referenced the code block below from Terence.
```js
    function printMe(){
        console.log("I am a reference example");
    }
```

_Example of Referencing Online Resources_

- https://developer.mozilla.org/en-US/
- https://www.w3schools.com/html/
- https://stackoverflow.com/questions/14494747/how-to-add-images-to-readme-md-on-github

