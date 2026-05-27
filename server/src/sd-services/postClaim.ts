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
import { GenericRDBMSOperations } from '../utils/ndefault-sql/ExecuteSql/GenericRDBMSOperations'; //_splitter_
//append_imports_end
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class postClaim {
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
    this.serviceName = 'postClaim';
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
      instance = new postClaim(
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
    //appendnew_flow_postClaim_TimerStart
  }

  private mountAllMiddlewares() {
    log.debug('mounting all middlewares for service :: postClaim');
    //appendnew_flow_postClaim_MiddlewareStart
  }

  private mountAllPaths() {
    log.debug('mounting all paths for service :: postClaim');

    this.app['post'](
      `${this.serviceBasePath}/claim`,
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
          bh = await this.claimQueryBody(bh, parentSpanInst);
          //appendnew_next_sd_HTjLeJzff06gMPXm
        } catch (e) {
          return await this.errorHandler(bh, e, 'sd_HTjLeJzff06gMPXm');
        }
      },
      this.sdService.getMiddlesWaresBySequenceId(
        null,
        'post',
        this.generatedMiddlewares
      )
    );
    //appendnew_flow_postClaim_HttpIn
  }
  //   service flows_postClaim

  //appendnew_flow_postClaim_start

  async claimQueryBody(bh, parentSpanInst) {
    const spanInst = this.tracerService.createSpan(
      'claimQueryBody',
      parentSpanInst
    );
    try {
      bh.local.body = bh.input.body;
      bh.local.insertQuery = `
      INSERT INTO claims (
      case_number, policy_number, vehicle_make, vehicle_model, vehicle_year,
      liability_pct, reserve_amount, deductible_recovery, recovery_applicable,
      handler_decision, handler_remarks, supervisor_decision, supervisor_remarks, status
  ) VALUES (
      '${bh.local.body.case_number}',
      '${bh.local.body.policy_number}',
      '${bh.local.body.vehicle_make}',
      '${bh.local.body.vehicle_model}',
      ${bh.local.body.vehicle_year},
      ${bh.local.body.liability_pct},
      ${bh.local.body.reserve_amount},
      ${bh.local.body.deductible_recovery},
      ${bh.local.body.recovery_applicable},
      '${bh.local.body.handler_decision}',
      '${bh.local.body.handler_remarks}',
      '${bh.local.body.supervisor_decision}',
      '${bh.local.body.supervisor_remarks}',
      '${bh.local.body.status}'
  )
  ON CONFLICT (case_number) DO UPDATE SET
      handler_decision = EXCLUDED.handler_decision,
      handler_remarks = EXCLUDED.handler_remarks,
      supervisor_decision = EXCLUDED.supervisor_decision,
      supervisor_remarks = EXCLUDED.supervisor_remarks,
      reserve_amount = EXCLUDED.reserve_amount,
      status = EXCLUDED.status
  `;
      this.tracerService.sendData(spanInst, bh);
      bh = await this.insertClaimQuery(bh, parentSpanInst);
      //appendnew_next_claimQueryBody
      return bh;
    } catch (e) {
      return await this.errorHandler(
        bh,
        e,
        'sd_mfHIuhCYJN0JfmX6',
        spanInst,
        'claimQueryBody'
      );
    }
  }

  async insertClaimQuery(bh, parentSpanInst) {
    const spanInst = this.tracerService.createSpan(
      'insertClaimQuery',
      parentSpanInst
    );
    try {
      let configObj = this.sdService.getConfigObj(
        'db-config',
        'sd_NXdLAOeMJCyRLjWN'
      );
      let connectionName;
      if (
        configObj &&
        configObj.hasOwnProperty('dbOption') &&
        configObj.dbOption.hasOwnProperty('name')
      ) {
        connectionName = configObj.dbOption.name;
      } else {
        throw new Error('Cannot find the selected config name');
      }
      let params = [];
      params = params ? params : [];
      bh.local.rawResult = await new GenericRDBMSOperations().executeSQL(
        connectionName,
        bh.local.insertQuery,
        params
      );
      this.tracerService.sendData(spanInst, bh);
      bh = await this.claimResponse(bh, parentSpanInst);
      //appendnew_next_insertClaimQuery
      return bh;
    } catch (e) {
      return await this.errorHandler(
        bh,
        e,
        'sd_36rWtdJ74elBFwiX',
        spanInst,
        'insertClaimQuery'
      );
    }
  }

  async claimResponse(bh, parentSpanInst) {
    const spanInst = this.tracerService.createSpan(
      'claimResponse',
      parentSpanInst
    );
    try {
      bh.local.response = {
        success: true,
        message: 'Claim persisted successfully',
      };
      this.tracerService.sendData(spanInst, bh);
      await this.claimResponseOut(bh, parentSpanInst);
      //appendnew_next_claimResponse
      return bh;
    } catch (e) {
      return await this.errorHandler(
        bh,
        e,
        'sd_pkv5L0aVv7x9CE04',
        spanInst,
        'claimResponse'
      );
    }
  }

  async claimResponseOut(bh, parentSpanInst) {
    try {
      bh.web.res.status(200).send(bh.local.response);

      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_wDPliJkG0v4wQZVv');
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
  //appendnew_flow_postClaim_Catch
}
