// _neu_generated_code__dont_modify_directly_
let instance = null;
//CORE_REFERENCE_IMPORTS
//append_imports_start

import cookieParser from 'cookie-parser'; //_splitter_
import { dirname } from 'path'; //_splitter_
import { fileURLToPath } from 'url'; //_splitter_
import { SDBaseService } from '../services/SDBaseService'; //_splitter_
import { TracerService } from '../services/TracerService'; //_splitter_
import log from '../utils/Logger'; //_splitter_
//append_imports_end
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class applyReelsRules {
  private sdService = new SDBaseService();
  private tracerService = new TracerService();
  private app;
  private serviceBasePath: string;
  private generatedMiddlewares: Object;
  private serviceName: string;

  private globalTimers: any;
  private constructor(
    app,
    generatedeMiddlewares,
    routeCall,
    middlewareCall,
    globalTimers
  ) {
    this.serviceName = 'applyReelsRules';
    this.app = app;
    this.serviceBasePath = this.app.settings.base;
    this.generatedMiddlewares = generatedeMiddlewares;
    this.globalTimers = globalTimers;
  }

  static getInstance(
    app?,
    generatedeMiddlewares?,
    routeCall?,
    middlewareCall?,
    globalTimers?
  ) {
    if (!instance) {
      instance = new applyReelsRules(
        app,
        generatedeMiddlewares,
        routeCall,
        middlewareCall,
        globalTimers
      );
    }
    instance.mountCalls(routeCall, middlewareCall);
    return instance;
  }

  private mountCalls(routeCall, middlewareCall) {
    if (routeCall) {
      this.mountAllPaths();
      this.mountAllListeners();
    }
    if (middlewareCall) {
      this.generatedMiddlewares[this.serviceName] = {};
      this.mountAllMiddlewares();
      this.mountTimers();
    }
  }

  async mountAllListeners() {
    //append_listeners
  }

  async mountTimers() {
    //appendnew_flow_applyReelsRules_TimerStart
  }

  private mountAllMiddlewares() {
    log.debug('mounting all middlewares for service :: applyReelsRules');
    //appendnew_flow_applyReelsRules_MiddlewareStart
  }

  private mountAllPaths() {
    log.debug('mounting all paths for service :: applyReelsRules');

    this.app['post'](
      `${this.serviceBasePath}/apply-reels-rules`,
      cookieParser(),
      this.sdService.getMiddlesWaresBySequenceId(
        null,
        'pre',
        this.generatedMiddlewares
      ),

      async (req, res, next) => {
        let bh: any = {};
        try {
          bh = this.sdService.__constructDefault(
            { local: {}, input: {} },
            req,
            res,
            next
          );
          let parentSpanInst = null;
          bh = await this.reelsBodyWithToken(bh, parentSpanInst);
          //appendnew_next_sd_fcCCzs0wi4TUgerD
        } catch (e) {
          return await this.errorHandler(bh, e, 'sd_fcCCzs0wi4TUgerD');
        }
      },
      this.sdService.getMiddlesWaresBySequenceId(
        null,
        'post',
        this.generatedMiddlewares
      )
    );
    //appendnew_flow_applyReelsRules_HttpIn
  }
  //   service flows_applyReelsRules

  //appendnew_flow_applyReelsRules_start

  async reelsBodyWithToken(bh, parentSpanInst) {
    const spanInst = this.tracerService.createSpan(
      'reelsBodyWithToken',
      parentSpanInst
    );
    try {
      bh.local.policy_number = bh.input.body.policy_number;
      bh.local.reserve_amount = bh.input.body.reserve_amount;
      bh.local.claim_type = bh.input.body.claim_type;
      bh.local.token = process.env.REELS_TOKEN;
      console.log('TOKEN:', process.env.REELS_TOKEN);

      bh.local.reelsBody = {
        workflowId: process.env.REELS_RULE_ID,
        version: process.env.REELS_VERSION,
        inputObj: {
          policy_number: bh.local.policy_number,
          reserve_amount: bh.local.reserve_amount,
          claim_type: bh.local.claim_type,
        },
      };
      this.tracerService.sendData(spanInst, bh);
      bh = await this.getReelsReponse(bh, parentSpanInst);
      //appendnew_next_reelsBodyWithToken
      return bh;
    } catch (e) {
      return await this.errorHandler(
        bh,
        e,
        'sd_F4een9OWPnVVCXDT',
        spanInst,
        'reelsBodyWithToken'
      );
    }
  }

  async getReelsReponse(bh, parentSpanInst) {
    try {
      let requestOptions: any = {
        url: process.env.REELS_URL,
        timeout: 30000,
        method: 'post',
        headers: {
          token:
            '15a3a8ad-aa26-4d02-b466-ae3946ab4828.15d9d06aa6252fea433a2de152b2254ec6afec3cf34acdc015f1286e40445a7f',
        },
        followRedirects: true,
        cookies: undefined,
        authType: undefined,
        body: bh.local.reelsBody,
        paytoqs: false,
        proxyConfig: undefined,
        tlsConfig: undefined,
        ret: 'json',
        params: {},
        username: undefined,
        password: undefined,
        token: bh.local.token,
        useQuerystring: false,
      };
      requestOptions.rejectUnauthorized = false;
      requestOptions.tlsConfig = undefined;
      requestOptions.proxyConfig = undefined;
      let responseMsg: any = await this.sdService.httpRequest(
        requestOptions.url,
        requestOptions.timeout,
        requestOptions.method,
        requestOptions.headers,
        requestOptions.followRedirects,
        requestOptions.cookies,
        requestOptions.authType,
        requestOptions.body,
        requestOptions.paytoqs,
        requestOptions.proxyConfig,
        requestOptions.tlsConfig,
        requestOptions.ret,
        requestOptions.params,
        requestOptions.rejectUnauthorized,
        requestOptions.username,
        requestOptions.password,
        requestOptions.token
      );

      bh.local.reelsResponse = responseMsg;
      bh = await this.result(bh, parentSpanInst);
      //appendnew_next_getReelsReponse
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_GlOxBnv1PijiNodk');
    }
  }

  async result(bh, parentSpanInst) {
    const spanInst = this.tracerService.createSpan('result', parentSpanInst);
    try {
      bh.local.response = {
        vehicle_make: bh.local.reelsResponse.payload.result.vehicle_make,
        vehicle_model: bh.local.reelsResponse.payload.result.vehicle_model,
        vehicle_year: bh.local.reelsResponse.payload.result.vehicle_year,
        vehicle_body_type:
          bh.local.reelsResponse.payload.result.vehicle_body_type,
        needs_supervisor:
          bh.local.reelsResponse.payload.result.needs_supervisor,
        recovery_applicable:
          bh.local.reelsResponse.payload.result.recovery_applicable,
        deductible_amount:
          bh.local.reelsResponse.payload.result.deductible_amount,
      };
      this.tracerService.sendData(spanInst, bh);
      await this.out(bh, parentSpanInst);
      //appendnew_next_result
      return bh;
    } catch (e) {
      return await this.errorHandler(
        bh,
        e,
        'sd_XPqRDCqsaZsnuMy0',
        spanInst,
        'result'
      );
    }
  }

  async out(bh, parentSpanInst) {
    try {
      bh.web.res.status(200).send(bh.local.response);

      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_ZFGhQ1eem1Dgjb2r');
    }
  }

  //appendnew_node

  // error_handler_slot
  private async errorHandler(
    bh,
    e,
    src,
    parentSpanInst?,
    functionName?
  ): Promise<any> {
    console.error(e);
    bh.error = e;
    bh.errorSource = src;
    bh.errorFunName = functionName;
    this.tracerService.sendData(parentSpanInst, bh, true);
    if (bh.web.next) {
      bh.web.next(e);
    } else {
      throw e;
    }
  }
  //appendnew_flow_applyReelsRules_Catch
}
