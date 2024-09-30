
let container= document.querySelector('.mainContainer');
let count=1;
let state = undefined;
let xArr=[];
let oArr=[];
let shiftedItem = undefined;
let sortedArray=undefined;
let subsets =undefined;
let finalResult = undefined;
let eraseItem = undefined;
let ifTrueExists = [];
let message = document.querySelector('.message');
let winningConditionArr=[
    ['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], 
    ['1', '4', '7'], ['2', '5', '8'],['3', '6', '9'], 
    ['1', '5', '9'], ['3', '5', '7']
    ];


container.addEventListener('click',(e)=>{
if(e.target.classList.contains('tableData')){
    if(count % 2 !== 0){
        e.target.innerHTML='X'; 
        xArr.push(e.target.classList[1]);
       
        if(count>6){
            sortedArray=xArr;
            subsets = getSubsetsOfThree(sortedArray);
            
            subsets.forEach(set=>{
            
            set.sort();
            finalResult = check(set);
            ifTrueExists.push(finalResult);
            
            });
            finalResult=ifTrueExists.filter(result => result === true)
            if(finalResult.length !== 0){
                message.innerHTML='X wins';
               clearGame()
              
            }else{
                shiftedItem = xArr.shift();
               eraseItem = document.getElementsByClassName(shiftedItem);
        

               if (eraseItem.length > 0) {
                Array.from(eraseItem).forEach(item => {
                    setTimeout(() => {
                        item.innerHTML = '';
                       },1000); // or set to whatever you need
                });
                                            }
            }

            
           

         }else{
          
                finalResult=check(xArr);
                if(finalResult){
                    message.innerHTML='X wins';
                    clearGame()
                }
            
         }
        
       
    }else{ 
        
        e.target.innerHTML='O';
        oArr.push(e.target.classList[1]);
      
        if(count>6){
            sortedArray=oArr;
          subsets = getSubsetsOfThree(sortedArray);

          
          subsets.forEach(set=>{
            set.sort()
            finalResult =check(set);
            ifTrueExists.push(finalResult);
            
          })

          finalResult=ifTrueExists.filter(result => result === true)
          if(finalResult.length !== 0){
           message.innerHTML='O wins';
           clearGame()
        }else{
            shiftedItem = oArr.shift();
            eraseItem = document.getElementsByClassName(shiftedItem);
            if (eraseItem.length > 0) {
                Array.from(eraseItem).forEach(item => {
                   setTimeout(() => {
                    item.innerHTML = '';
                   }, 1000); // or set to whatever you need
                });
            }
            
        
        }
           
           

        }else{
            
                finalResult=check(oArr);
                
            
            if(finalResult){
                 message.innerHTML='O wins'
                clearGame()
            }
        }

       
    }

   
   //check for win
   
    count++;
    ifTrueExists= [];
   
    
}
})







function clearGame(){
    setTimeout(() => {
        window.location.reload();
    }, 3000);
}






function check(arrayToCheck){
    state = winningConditionArr.some(subArray =>
        subArray.length === arrayToCheck.length && 
        arrayToCheck.every(value => subArray.includes(value))
    );
    return state;
}

function getSubsetsOfThree(arr) {
    const result = [];

    function findSubsets(start, currentSubset) {
        // If the current subset has three elements, add it to the result
        if (currentSubset.length === 3) {
            result.push([...currentSubset]);
            return;
        }

        // Loop through the array to build subsets
        for (let i = start; i < arr.length; i++) {
            currentSubset.push(arr[i]);
            findSubsets(i + 1, currentSubset); // Move to the next element
            currentSubset.pop(); // Backtrack to explore other combinations
        }
    }

    findSubsets(0, []);
    return result;
}

