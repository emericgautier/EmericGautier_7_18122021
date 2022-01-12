<template>
    <span>{{ formattedDate }}</span>
</template>

<script>

    export default {
        name: 'FormattedDate',
        props: ['date'],
        data() {
            return {
                formattedDate: ''
            }
        },
        async mounted() {
            const test = this.date.split('T')
            const splitDate = test[0].split('-')
            const splitTime = test[1].split(':')
            const splitedDate = {
                'year': splitDate[0],
                'month': splitDate[1],
                'day': splitDate[2],
                'hours': splitTime[0],
                'minutes':splitTime[1],
                'seconds': splitTime[2].substring(0,2)
            }
            let month = ''
            switch (splitedDate.month) {
                case '01':
                    month = ' janvier'
                    break
                case '02':
                    month = ' février'
                    break
                case '03':
                    month = ' mars'
                    break
                case '04':
                    month = ' avril'
                    break
                case '05':
                    month = ' mai'
                    break
                case '06':
                    month = ' juin'
                    break
                case '07':
                    month = ' juillet'
                    break
                case '08':
                    month = ' août'
                    break
                case '09':
                    month = ' septembre'
                    break
                case '10':
                    month = ' octobre'
                    break
                case '11':
                    month = ' novembre'
                    break
                case '12':
                    month = ' décembre'
                    break
            }
            return this.formattedDate = 'le ' + splitedDate.day + month + ' à ' + splitedDate.hours + ':' + splitedDate.minutes 
        }
    }

</script>