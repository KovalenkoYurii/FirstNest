"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const TelegramBot = require("node-telegram-bot-api");
const schedule_service_1 = require("../schedule/schedule.service");
const currency_service_1 = require("src/currency/currency.service");
let TelegramService = class TelegramService {
    constructor(schedule, currency) {
        this.schedule = schedule;
        this.currency = currency;
        this.defaultUrl = 'https://awesome-nest-project-develop.herokuapp.com';
        this.scheduleWebhook = `${process.env.APP_URL ||
            this.defaultUrl}/telegram/schedule`;
        this.scheduleToken =
            process.env.SCHEDULE_BOT || 'no scheduleToken provided';
        this.scheduleBot = new TelegramBot(this.scheduleToken);
        this.scheduleBot.setWebHook(this.scheduleWebhook);
        this.groupRegex = /[А-я|і]*-[\d]*/gi;
        this.currencyRegex = /^(usd|eur)$/gi;
        this.currencyWebhook = `${process.env.APP_URL ||
            this.defaultUrl}/telegram/currency`;
        this.currencyToken =
            process.env.CURRENCY_BOT || 'no currencyToken provided';
        this.currencyBot = new TelegramBot(this.currencyToken);
        this.currencyBot.setWebHook(this.currencyWebhook);
    }
    handleScheduleMessage(chatId, text) {
        if (this.groupRegex.test(text)) {
            this.getNextLesson(text).then(nextLesson => this.scheduleBot.sendMessage(chatId, nextLesson), _ => this.scheduleBot.sendMessage(chatId, 'not found'));
        }
        else {
            this.scheduleBot.sendMessage(chatId, 'wrong');
        }
    }
    getNextLesson(groupName) {
        return this.schedule.getNextLessonForGroup(groupName);
    }
    handleCurrencyMessage(chatId, text) {
        if (this.currencyRegex.test(text)) {
            this.getCurrency(text).then(course => this.currencyBot.sendMessage(chatId, course), _ => this.currencyBot.sendMessage(chatId, 'error'));
        }
        else {
            this.currencyBot.sendMessage(chatId, 'wrong currency');
        }
    }
    getCurrency(currencyCode) {
        return this.currency.getCurrency(currencyCode);
    }
};
TelegramService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [schedule_service_1.ScheduleService,
        currency_service_1.CurrencyService])
], TelegramService);
exports.TelegramService = TelegramService;
//# sourceMappingURL=telegram.service.js.map