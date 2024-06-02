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
exports.AppService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let AppService = class AppService {
    constructor(mailerService) {
        this.mailerService = mailerService;
        this.prisma = new client_1.PrismaClient();
    }
    async handleGetStatus({ id }) {
        try {
            const registro = await this.prisma.registros.findUnique({
                where: { id: id }
            });
            return registro;
        }
        catch (error) {
            console.log(error);
            throw new Error('Error al buscar el registro');
        }
    }
    async handleCreateOrder(orderStatusEvent) {
        try {
            await this.mailerService.sendMail({
                to: 'pruebasdt2.2024@gmail.com',
                subject: 'Estado de la Orden',
                html: `<b>El estado de la orden se encuentra en el siguiente estado: ${orderStatusEvent.estado}</b><p>Para ver el estado de la orden puede usar el siguiente id: ${orderStatusEvent.id}</p>`
            });
            await this.prisma.registros.upsert({
                where: { id: orderStatusEvent.id },
                update: {
                    title: orderStatusEvent.title,
                    price: orderStatusEvent.price,
                    estado: orderStatusEvent.estado,
                },
                create: {
                    id: orderStatusEvent.id,
                    title: orderStatusEvent.title,
                    price: orderStatusEvent.price,
                    estado: orderStatusEvent.estado,
                },
            });
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], AppService);
//# sourceMappingURL=app.service.js.map