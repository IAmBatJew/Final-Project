const Offer = {
    data() {
        return {
            "students": [],
            selectedStudent: null,
            offerForm:{},
            "offers": []
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

        selectStudent(s) {
            if (s == this.selectedStudent) {
                return;
            }

            this.selectedStudent = s;
            this.offers = [];
            this.fetchOfferData(this.selectedStudent);
        },

        fetchStudentData(){
            fetch('/api/students/')
        
            .then( response => response.json())
    
            .then( (responseJson) => {
                console.log(responseJson);
                this.students = responseJson;
            }
            )
    
            .catch( (err) => {
    
                    console.error(err);
            })
        },

        fetchOfferData(s){
            console.log("Fetching offer data for ", s);
            fetch('/api/offers/offersIndex.php?student=' + s.id)
            .then( response => response.json())
            .then( (responseJson) => {
                console.log(responseJson);
                this.offers = responseJson;
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
        this.fetchStudentData();
    }
}

Vue.createApp(Offer).mount('#offerApp')