<template>
    <div class="uk-grid pk-grid-large pk-width-sidebar-large uk-form-stacked" data-uk-grid-margin>
        <div class="pk-width-content">
            <div class="uk-form-row">
                <input class="uk-width-1-1 uk-form-large" type="text" name="ip" :placeholder="'Enter IP Address' | trans"
                       v-model="ban.ip" v-validate:required>
                <p class="uk-form-help-block uk-text-danger"
                   v-show="form.ip.invalid">{{ 'IP cannot be blank.' | trans }}</p>
            </div>
            <div class="uk-form-row">
                <label for="form-ban-reason" class="uk-form-label">{{ 'Reason' | trans }}</label>
                <div class="uk-form-controls">
                    <v-editor id="ban-reason" type="code" :value.sync="ban.reason"></v-editor>
                </div>
            </div>
            <div class="uk-form-row">
                <label for="form-ban-entries" class="uk-form-label">{{ 'Entries' | trans }}</label>
                    <div class="uk-panel uk-panel-box uk-overflow-container">
                        <div class="uk-form-controls">
                        <table class="uk-table uk-table-striped uk-table-condensed uk-text-nowrap" v-if="ban.entries.length">
                            <thead>
                            <tr>
                                <th>{{ 'IP' | trans }}</th>
                                <th>{{ 'Referrer' | trans }}</th>
                                <th>{{ 'Result' | trans }}</th>
                                <th>{{ 'Date' | trans }}</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="entry in ban.entries">
                                    <td>{{ entry.ip }}</td>
                                    <td>{{ entry.referrer }}</td>
                                    <td>{{ entry.data.result }}</td>
                                    <td>{{ entry.date | date }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h3 class="uk-h1 uk-text-muted uk-text-center"
                            v-show="ban.entries && !ban.entries.length">{{ 'No entries found.' | trans }}</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="pk-width-sidebar">
            <div class="uk-panel">
                <div class="uk-form-row">
                    <label for="form-status" class="uk-form-label">{{ 'Status' | trans }}</label>
                    <div class="uk-form-controls">
                        <select id="form-status" class="uk-width-1-1" v-model="ban.status">
                            <option v-for="(id, status) in data.statuses" :value="id">{{status}}</option>
                        </select>
                    </div>
                </div>
                <div class="uk-form-row" v-if="ban.jail">
                    <label for="form-type" class="uk-form-label">{{ 'Jail' | trans }}</label>
                    <div id="form-type" class="uk-badge">{{ ban.jail }}</div>
                </div>
                <div class="uk-form-row">
                    <span class="uk-form-label">{{ 'Date' | trans }}</span>
                    <div class="uk-form-controls">
                        <input-date :datetime.sync="ban.date"></input-date>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

module.exports = {

	props: ['ban', 'data', 'form'],

	section: {
		label: 'Ban'
	}

};

</script>