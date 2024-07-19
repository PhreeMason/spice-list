## option 1
### decision
    scan a book -> send request to edge function
                    edge fuction adds record book to scans table
      
### problems 
    Everytime the function is called a record is added to scans table
    Cant use the function for general search

