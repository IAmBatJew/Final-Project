const Offer = {
    data() {
        return {
            "referee": [],
            selectedRef: null,
            offerForm:{},
            "games": [],
            "assignments":[]
        }
    },

    computed: {
        prettyBirthday() {
            return dayjs(this.result.dob.date)
            .format('D MMM YYYY')
        }
    },

    methods: {

        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },

        selectRef(ref) {
            if (ref == this.selectedRef) {
                return;
            }
            this.selectedRef = ref;
            this.assignments = [];
            this.fetchAssignmentData(this.selectedRef);
        },

        fetchRefereeData(){
            fetch('/api/referees/')
        
            .then( response => response.json())
    
            .then( (responseJson) => {
                console.log(responseJson);
                this.referee = responseJson;
            }
            )
    
            .catch( (err) => {
    
                    console.error(err);
            })
        },

        fetchGameData(){
            fetch('/api/games/')
        
            .then( response => response.json())
    
            .then( (responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
            }
            )
    
            .catch( (err) => {
    
                    console.error(err);
            })
        },

        fetchAssignmentData(ref){
            console.log("Fetching assignment data for ", ref);
            fetch('/api/assignment/?referee=' + ref.referee_id)
            .then( response => response.json())
            .then( (responseJson) => {
                console.log(responseJson);
                this.assignments = responseJson;
            })
    
            .catch( (err) => {
    
                    console.error(err);
            })
        },

        postNewOffer(evt) {

            this.offerForm.studentId = this.selectedStudent.id;
            console.log("Posting:", this.offerForm);
            // alert("Posting!");
    
            fetch('api/offers/create.php', {
                method:'POST',
                body: JSON.stringify(this.offerForm),
                headers: {
                    "content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then ( json => {
                console.log("Returned from post:", json);
                //TODO: test a result was returned!
                this.offers = json;
    
                //Reset the form
                this.offerForm = {};
            });
        },
    },

    created() {
        this.fetchRefereeData();
        this.fetchGameData();
    }
}


Vue.createApp(Offer).mount('#offerApp')