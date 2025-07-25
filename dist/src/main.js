"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api', {
        exclude: [{ path: '', method: common_1.RequestMethod.GET }],
    });
    const port = process.env.PORT || 3010;
    const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Romania Endpoints API')
        .setDescription('API for Romanian counties and localities data\n\n**Rate Limiting:** 1 request per second per IP address')
        .setVersion('1.0')
        .addServer(baseUrl, 'API Server')
        .addTag('counties', 'Romanian counties operations')
        .addTag('localities', 'Romanian localities operations')
        .addTag('postal-codes', 'Romanian postal codes operations')
        .addTag('companies', 'Romanian companies operations')
        .addTag('health', 'Health check operations')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    await app.listen(port);
    console.log(`Application is running on: ${baseUrl}`);
    console.log(`Landing page: ${baseUrl}/`);
    console.log(`API endpoints available at: ${baseUrl}/api/`);
    console.log(`Swagger documentation: ${baseUrl}/api/docs`);
    console.log(`Rate limiting: 1 request per second per IP`);
}
bootstrap();
//# sourceMappingURL=main.js.map