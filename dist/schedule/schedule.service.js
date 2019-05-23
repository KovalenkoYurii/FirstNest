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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jsdom_1 = require("jsdom");
let ScheduleService = class ScheduleService {
    constructor(http) {
        this.http = http;
        this.lessonUrl = 'https://api.rozklad.org.ua/v2/groups';
        this.groupRegex = /[А-я|і]*-[\d]*/g;
    }
    getGroupUrl(groupName) {
        return __awaiter(this, void 0, void 0, function* () {
            const encodedGroupName = encodeURIComponent(groupName);
            const response = yield this.http
                .get(`${this.lessonUrl}/${encodedGroupName}`)
                .toPromise();
            return response.data.data.group_url;
        });
    }
    getNextLessonForGroup(groupName) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupUrl = yield this.getGroupUrl(groupName);
            const { window: { document }, } = yield jsdom_1.JSDOM.fromURL(groupUrl, {
                resources: 'usable',
                runScripts: 'dangerously',
            });
            const nextLesson = document.querySelector('.closest_pair .plainLink') ||
                document.querySelector('.current_pair .plainLink');
            return nextLesson.textContent;
        });
    }
};
ScheduleService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], ScheduleService);
exports.ScheduleService = ScheduleService;
//# sourceMappingURL=schedule.service.js.map