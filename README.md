# Todo-Management-Dashboard-App

A single page UI project developed with Angular to manage Todo list of a user.

The features of this app are :-

1.Responsive across any device
2.Single page application
3.Graphical view for better understanding
4.User can filter task based on text as well as view all the completed and incomplete task with the help of grid, which provides a paginated view.
5.User can also remove a single or more than one task simultaneously.

## Build

This application depends on the backend developed using Spring boot and available at this location :-
 
https://github.com/subhamsaha-manu/Spring-Boot-App-With-TDD

Steps to run this application :-

1.Checkout both the frontend and backend repositories in different folder.
2.Search the frontend directory for the text 192.168.0.104 which was my personal ip, and replace it with local ip
3.Build and start the backend local server using 
    mvn clean install
4.Install the frontend dependencies using
    npm install
5.When both the commands are executed sucessfully, run the following command
    ng serve --host=<local-ip>
6.Open browser at the given address
7.As the backend is based on local H2 database, thus make some entries to see the graph and grid in action
8.For any quries contact me at subhamsaha90@gmail.com