//Listen For Submit
document.getElementById('loan-form').addEventListener('submit',function(e){
  //Hide Results
  document.getElementById('results').style.display = 'none';
  //Show Loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults ,2000);
  e.preventDefault();
});

//calculateResults

function calculateResults () {
    console.log('Calculated');
    //Ui Variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principle = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayment  = parseFloat(years.value) * 12 ;

    //Compute monthly Payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principle*x*calculatedInterest)/(x-1);

    if (isFinite(monthly)) {
    	monthlyPayment.value = monthly.toFixed(2);
    	totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    	totalInterest.value = ((monthly * calculatedPayment) - principle).toFixed(2);
    	//Show Resultls
    	document.getElementById('results').style.display = 'block';
    	//Hide Loading
    	document.getElementById('loading').style.display = 'none';
    }else{
    	showError('Please Check Your Numbers');
    }
  

	
}

//Show Error
function showError (error) {
	//Create Div
	const errorDiv = document.createElement('div');
	//Add class
	errorDiv.className = 'alert alert-danger';
	//Add Text
	errorDiv.appendChild(document.createTextNode(error));
	//Get Elements
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	//Insert Error Above heading
	card.insertBefore(errorDiv, heading);

	//Hide Results
	document.getElementById('results').style.display = 'none';

	//Hide Loading
    document.getElementById('loading').style.display = 'none';

	//Clear Error after 3 sec
	setTimeout(clearError, 3000)

}

//clearError
function clearError () {
	document.querySelector('.alert').remove();
}